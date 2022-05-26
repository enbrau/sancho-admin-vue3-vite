import { createRouter, createWebHashHistory } from 'vue-router'
import { beforeRouteHook, afterRouteHook, errorHook } from '@/hooks'

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
  ...staticRoutes,
  { path: '/404', component: () => import('@/views/error/404.vue') },
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
