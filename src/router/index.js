import { createRouter, createWebHashHistory } from 'vue-router'
import { beforeRouteHook, afterRouteHook, errorHook } from '@/hooks'
import { deepClone } from '@/utils'
import store from '@/store'
import { PERM_KEYS } from '@/consts'
import Layout from '@/layout'

const scannedRoutes = []
const moduleFiles = import.meta.globEager('./modules/*.js')
for (const moduleFileName in moduleFiles) {
  const module = moduleFiles[moduleFileName]
  const moduleName = moduleFileName.replace(/^\.\/(.*)\.\w+$/, '$1').replace('modules/', '')
  const target = module.default
  if (Array.isArray(target)) {
    for (const route of target) {
      scannedRoutes.push(route)
    }
  } else {
    scannedRoutes.push(target)
  }
  console.log(`[Sancho] Route loaded: ${moduleName}`)
}

const staticRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error/404.vue'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    isMenu: true,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard'),
        meta: { title: 'common.menus.Dashboard', icon: 'home', affix: true, noCache: true }
      }
    ]
  },
  { path: '/:pathMatch(.*)*', redirect: '/404', hidden: true }
]

export const dynamicRoutes = [
  ...scannedRoutes,
  // mismatched route all goes to 404
  { path: '/:pathMatch(.*)*', redirect: '/404', hidden: true }
]

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ left: 0 }),
  routes: staticRoutes
})

const whiteList = ['/login']
router.beforeEach(async (to, from, next) => {
  const token = await store.dispatch('subscriber/getToken')

  if (!token) {
    if (whiteList.indexOf(to.path) >= 0) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
    return
  }

  let profile = store.state.subscriber.profile
  if (!profile) {
    try {
      await store.dispatch('subscriber/updateProfile')
      profile = store.state.subscriber.profile
    } catch(error) {
      await store.dispatch('subscriber/logout')
      next('login')
      return
    }
  }

  const routes = deepClone([...staticRoutes, ...dynamicRoutes])
  // Update Routes
  const accessibleRoutes = await store.dispatch('subscriber/updateRoutes', routes)

  for (const route of accessibleRoutes) {
    router.addRoute(route)
  }
  router.addRoute({ path: '/:pathMatch(.*)*', redirect: '/404', hidden: true })

  return beforeRouteHook.promise(to, from, next)
    .then(() => {
      next()
    })
    .catch((error) => {
      errorHook.call(error)
    })
})

router.afterEach(async (route) => {
  return afterRouteHook.promise(route)
    .catch((error) => {
      errorHook.call(error)
    })
})

export default router

export function hasPermission(actionKey) {
  const perms = store.state.subscriber.perms

  if (!actionKey || perms.includes(PERM_KEYS.SUPER_ADMIN)) {
    return true
  }

  return perms.includes(actionKey)
}

export function filterRoutes(routes, { perms }) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }

    if (!(tmp.isMenu) || (tmp.isMenu && hasPermission(tmp.meta ? tmp.meta.title : '_' )) || tmp.isAnon) {
      if (tmp.children) {
        tmp.children = filterRoutes(tmp.children, { perms })
      }
      res.push(tmp)
    }
  })

  return res
}

export function filterMenus(routes) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    tmp.id = tmp.meta && tmp.meta.title ? tmp.meta.title : tmp.path
    tmp.name = i18n.global.t(tmp.meta && tmp.meta.title ? tmp.meta.title : tmp.path)

    if (tmp.children) {
      tmp.children = filterMenus(tmp.children)
    }

    if (tmp.isMenu || tmp.path === 'dashboard') {
      res.push(tmp)
    } else if (tmp.children) {
      tmp.children.forEach(tmpChild => {
        if (tmpChild.isMenu || tmpChild.path === 'dashboard') {
          res.push(tmpChild)
        }
      })
    }
  })

  return res
}
