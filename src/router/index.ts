import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginPage/LoginPage.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterPage/RegisterPage.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomePage/HomePage.vue')
    },
    {
      path: '/:slug',
      name: 'detail',
      component: () => import('../views/DetailPage/DetailPage.vue')
    }
  ]
})

export default router
