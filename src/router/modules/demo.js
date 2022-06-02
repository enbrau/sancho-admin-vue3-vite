import Layout from '@/layout'

export default [
  {
    path: '/demo',
    component: Layout,
    redirect: 'noRedirect',
    isMenu: true,
    meta: { title: 'demo.menus.Demo', icon: 'demo-fill', affix: true, noCache: true },
    children: [
      {
        path: 'icon',
        component: () => import('@/views/demo/icons.vue'),
        isMenu: true,
        meta: { title: 'demo.menus.Icons', icon: 'icon-fill', affix: true, noCache: true }
      }
    ]
  }
]
