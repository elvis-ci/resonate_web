import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: 'PageError',
    component: () => import('../views/page-error'),
    meta: { title: 'Page not found' }
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home'),
    meta: { title: 'Home' }
  },
  {
    path: '/About-Us',
    name: 'Saas',
    component: () => import('../views/About-Us'),
    meta: { title: 'About Us' }
  },
  {
    path: '/Workspaces',
    name: 'Workspaces',
    component: () => import('../views/Workspaces'),
    meta: { title: 'Workspaces' }
  },
  {
    path: '/Community',
    name: 'Community',
    component: () => import('../views/Community'),
    meta: { title: 'Community' }
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('../views/Blog'),
    meta: { title: 'Blog' }
  },
  {
    path: '/Contact',
    name: 'Contact',
    component: () => import('../views/Contact'),
    meta: { title: 'Contact' }
  },
  {
    path: '/Sign-in',
    name: 'Sign-in',
    component: () => import('../views/Sign-in'),
    meta: { title: 'Sign-in' },
  },
  {
    path: '/Sign-up',
    name: 'Sign-up',
    component: () => import('../views/Sign-up')
  },
  {
    path: '/Reset-Password',
    name: 'Reset-Password',
    component: () => import('../views/Reset-Password')
  },
  {
    path: '/Terms',
    name: 'Terms',
    component: () => import('../views/Terms')
  },
  {
    path: '/Privacy-Policy',
    name: 'Privacy-Policy',
    component: () => import('../views/Privacy-Policy')
  },
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})
export default router
