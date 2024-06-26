import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '主页', icon: 'el-icon-s-home' }
    }]
  },

  {
    path: '/demo',
    component: Layout,
    redirect: '/demo',
    name: 'DEMO',
    meta: { title: '功能体验模块', icon: 'el-icon-magic-stick' },
    children: [
      {
        path: 'singleAnalysis',
        name: 'singleAnalysis',
        component: () => import('@/views/singleAnalysis/index'),
        meta: { title: '单条评论分析', icon: 'el-icon-chat-line-square' }
      },
      {
        path: 'batchAnalysis',
        name: 'batchAnalysis',
        component: () => import('@/views/batchAnalysis/index'),
        meta: { title: '批量评论分析', icon: 'el-icon-document' }
      }
    ]
  },

  {
    path: '/mars',
    component: Layout,
    redirect: '/mars',
    name: 'MARS',
    meta: { title: '课程分析推荐模块', icon: 'el-icon-search' },
    children: [
      {
        path: 'dbAnalysis',
        name: 'dbAnalysis',
        component: () => import('@/views/dbAnalysis/index'),
        meta: { title: '课程分析', icon: 'el-icon-data-analysis' }
      },
      {
        path: 'recommend',
        name: 'recommend',
        component: () => import('@/views/recommend/index'),
        meta: { title: '课程推荐', icon: 'el-icon-position' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/Deepennn/MOOC-ABSA-REC-SYS/',
        meta: { title: '跳转Github', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
