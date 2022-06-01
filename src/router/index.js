import { createRouter, createWebHashHistory } from 'vue-router'
import { beforeRouteHook, afterRouteHook, errorHook } from '@/hooks'
import Layout from '@/layout'

let staticRoutes = []
const moduleFiles = import.meta.globEager('./modules/*.js')
for (const moduleFileName in moduleFiles) {
  const module = moduleFiles[moduleFileName]
  const moduleName = moduleFileName.replace(/^\.\/(.*)\.\w+$/, '$1').replace('modules/', '')
  const target = module.default
  if (Array.isArray(target)) {
    for (const route of target) {
      staticRoutes.push(route)
    }
  } else {
    staticRoutes.push(target)
  }
  console.log(`[Sancho] Route loaded: ${moduleName}`)
}

const routes = [
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
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard'),
        meta: { title: 'common.menus.Dashboard', icon: 'home', affix: true, noCache: true }
      }
    ]
  },
  ...staticRoutes,
  { path: '/:pathMatch(.*)*', redirect: '/404', hidden: true }
]

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ left: 0 }),
  routes
})

router.beforeEach(async (to, from, next) => {


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
