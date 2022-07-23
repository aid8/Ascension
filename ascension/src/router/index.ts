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
  {
    path: '/StudentTest',
    name: 'StudentTest',
    component: () => import(/* webpackChunkName: "about" */ '../layouts/StudentTest.vue')
  },
  {
    path: '/RedirectPage',
    name: 'RedirectPage',
    component: () => import(/* webpackChunkName: "about" */ '../layouts/RedirectPage.vue')
  },
  {
    path: '/AccountSettings',
    name: 'AccountSettings',
    component: () => import(/* webpackChunkName: "about" */ '../layouts/AccountSettings.vue')
  },
  {
    path: '/StudentProfilePage',
    name: 'StudentProfilePage',
    component: () => import(/* webpackChunkName: "about" */ '../layouts/StudentProfilePage.vue')
  },
  {
    path: '/TestPage',
    name: 'TestPage',
    component: () => import(/* webpackChunkName: "about" */ '../layouts/TestPage.vue')
  },
  {
    path: '/HomeTest',
    name: 'HomeTest',
    component: () => import(/* webpackChunkName: "about" */ '../layouts/HomeTest.vue')
  },
  {
    path: '/SignUpPage',
    name: 'SignUpPage',
    component: () => import(/* webpackChunkName: "about" */ '../layouts/SignUpPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
