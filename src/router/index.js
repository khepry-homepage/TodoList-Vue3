
import Home from 'views/Home.vue'
import App from '@/App.vue'
import ListView from 'views/ListView.vue'
import FocusView from 'views/FocusView.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { 
    path: '/', redirect: '/home', component: App,
    children: [ 
      { 
        name: 'Home', path: '/home', component: Home, redirect: '/home/todolist',
        children: [
          { name: 'ListView', path: '/todolist', component: ListView },
          { name: 'FocusView', path: '/focus', component: FocusView },
        ]
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes, 
})

export default router;