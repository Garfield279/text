// import { getToken } from '@/utils/auth'
import { getToken } from '@/utils/auth'
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  { path: '/login', name: 'login', component: () => import('@/views/Login/index.vue') },
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/views/Index/index.vue'),
    children: [
      {
        path: '/home', component: () => import('@/views/Index/home.vue'), meta: {
          title: '首页',
          icon: 'el-icon-house'
        }
      },
      {
        path: '/dor', component: () => import('@/views/Index/dor.vue'), meta: {
          title: '宿舍管理',
          icon: 'el-icon-office-building'
        }
      },
      {
        path: '/student', component: () => import('@/views/Index/student.vue'), meta: {
          title: '学生信息',
          icon: 'el-icon-user'
        }
      },
      {
        path: '/cleanl', component: () => import('@/views/Index/clean.vue'), meta: {
          title: '卫生统计',
          icon: 'el-icon-document'
        }
      },
      {
        path: '/payment', component: () => import('@/views/Index/payment.vue'), meta: {
          title: '费用记录',
          icon: 'el-icon-edit-outline'
        }
      },
      {
        path: '/maintenance', component: () => import('@/views/Index/maintenance.vue'), meta: {
          title: '维修记录',
          icon: 'el-icon-document-copy'
        }
      },
      {
        path: '/remark', component: () => import('@/views/Index/remark.vue'), meta: {
          title: '备注',
          icon: 'el-icon-setting'
        }
      },
      {
        path: '/my',
        component: () => import('@/views/Index/my.vue'),
        meta: {
          title: '我的',
          icon: 'el-icon-user'
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

const whiltList = ['/login']

router.beforeEach((to, from, next) => {
  // 携带token 跳转登录页
  // const token = getToken()
  const token = store.state.token
  console.log(token);
  if (token) {
    if (whiltList.includes(to.path)) {
      next(from.path)
    } else {
      next()
    }
  } else {
    if (whiltList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
