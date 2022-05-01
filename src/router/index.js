
import Home from 'views/Home.vue'
import App from '@/App.vue'
import ListView from 'views/ListView.vue'
import FocusView from 'views/FocusView.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store/index.js'

const routes = [
  { 
    path: '/', redirect: '/home', component: App,
    children: [ 
      { 
        name: 'Home', path: 'home', component: Home, redirect: '/home/todolist',
        children: [
          { name: 'ListView', path: 'todolist', component: ListView },
          { name: 'FocusView', path: 'focus', component: FocusView,         
            // 只有经过身份验证的用户才能创建帖子
            meta: { requiresAuthLock: true }
          },
        ]
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes, 
})

// 全局路由前置守卫
router.beforeEach((to, from, next) => {
  // 处于锁屏状态则禁止路由导航
  if (from.meta.requiresAuthLock && store.state.LOCK_STATE) {
    next(from.path);
  }
  else {
    next();
  }
})

export default router;