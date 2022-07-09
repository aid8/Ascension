import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '../layouts/HomePage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/AccountCreation',
    name: 'AccountCreation',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../layouts/AccountCreation.vue')
  },
  {
    path: '/AdminPage',
    name: 'AdminPage',
    component: () => import(/* webpackChunkName: "about" */ '../layouts/AdminPage.vue')
  },
  {
    path: '/TeacherTest',
    name: 'TeacherTest',
    component: () => import(/* webpackChunkName: "about" */ '../layouts/TeacherTest.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
