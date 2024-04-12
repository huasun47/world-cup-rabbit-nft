import { createRouter, createWebHashHistory } from 'vue-router'
import { useIndexStore } from '@/store'

import Main from '@/views/index.vue'
import Home from '@/views/home/index.vue'
import Login from '@/views/login/index.vue'

const whitelist = ['/login']

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes: [
    {
      path: '/', component: Main,
      children: [
        {
          path: '/',
          component: Home
        }
      ]
    },
    {
      path: '/login', component: Login,
    }
  ],
})

router.beforeEach((to, from) => {
  if (whitelist.includes(to.fullPath)) {
    return true
  }
  const store = useIndexStore()

  if (!store.isOwner) {
    return '/login'
  }
})

export default router