import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from '../store'
import AuthServiceAuthRoute from '../modules/auth-service/auth/routes'

Vue.use(VueRouter)

const defaultRoutes = [
  {
    path: '/',
    name: 'auth.login',
    component: () => import('../modules/auth-service/auth/pages/Login.vue')
  }
]
const routes = [
  ...defaultRoutes,
  ...AuthServiceAuthRoute
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    const accessToken = Store.state.Auth.accessToken
    const authUser = Store.state.Auth.authUser
    if (accessToken && authUser) {
      return next()
    }

    return next({ path: '/auth/login' })
  }

  next()
})

export default router
