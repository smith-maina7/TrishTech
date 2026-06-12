import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/products',
    name: 'productList',
    component: () => import('../views/ProductListView.vue')
  },
  {
    path: '/products/:id',
    name: 'product',
    component: () => import('../views/ProductView.vue'),
    props: true
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/CartView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
