import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

/**
 * # 路由配置
 */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: '登录',
    component: () => import('@/airpower/Login.vue'),
  },
  {
    path: '/custom',
    name: '自定义页面',
    component: () => import('@/view/custom.vue'),
  },
  {
    path: '/',
    name: 'admin',
    redirect: '/home',
    component: () => import('@/component/Admin.vue'),
    children: [
      {
        path: ':catchAll(.*)',
        component: () => import('@/airpower/ErrorPage.vue'),
      },
    ],
  },
]
// 创建路由
const router = createRouter({
  history: createWebHistory(),
  routes,
})
router.beforeEach((to, _, next) => {
  if (to.meta.name) {
    const product = '东东平台'
    window.document.title = `${to.meta.name} - ${product}` || product
  }
  next()
})
router.afterEach(() => {
  window.scrollTo(0, 0)
})
export default router
