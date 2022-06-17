
const App = () => import('@/App.vue') 

const Home = () => import('@/views/Home.vue') 
const LoginView = () => import('@/views/LoginView.vue') 
const RegisterView = () => import('@/views/RegisterView.vue') 
const ListView = () => import('@/views/ListView.vue') 
const DataChartView = () => import('@/views/DataChartView.vue') 
const FocusView = () => import('@/views/FocusView.vue')
import { createRouter, createWebHashHistory } from 'vue-router'
import { api, store } from '../utils/index.js'

const routes = [
  { 
    path: '/', redirect: '/home', component: App,
    children: [
      { name: 'LoginView', path: 'login', component: LoginView }, 
      { name: 'RegisterView', path: 'register', component: RegisterView },
      { 
        name: 'Home', path: 'home', component: Home, redirect: '/home/todolist',
        children: [
          { name: 'ListView', path: 'todolist', component: ListView, meta: { requireAuthorize: true },
            beforeEnter: (to, from) => {
              store.commit('setNavIdx', 0);
            },
          },
          { name: 'DataChartView', path: 'datachart', component: DataChartView, meta: { requireAuthorize: true },
            beforeEnter: (to, from) => {
              store.commit('setNavIdx', 1);
            },
          },
          { name: 'FocusView', path: 'focus', component: FocusView, meta: { requireAuthLock: true, requireAuthorize: true },
            beforeEnter: (to, from) => {
              store.commit('setNavIdx', 2);
            },      
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

/*
 * bug
 * 当请求频率过快时refreshToken接口会出错，导致鉴权失败重定向回登录页面 
 */
// 全局路由前置守卫
router.beforeEach(async (to, from) => {
  let isNext = true;
  // 登录前鉴权
  if (to.meta.requireAuthorize) {
    await api.user.getUser()
      .then(res => {
        if (res?.code != 200) {
          return Promise.reject('error in refreshToken');
        }
        store.commit('initialLoginState', { userInfo: res.data });
      })
      .catch(err => {
        isNext = { replace: true, name: 'LoginView' }; // 重定向到登录页面
      });
  }
  // 处于锁屏状态则禁止路由导航
  if (from.meta.requireAuthLock && store.state.LOCK_STATE) {
    isNext = false;
  }
  return isNext;
})

export default router;