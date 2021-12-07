import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    name: 'home',
    path: '/',
    redirect: '/HelloWorld'
  },
  {
    name: 'HelloWorld',
    path: '/HelloWorld',
    component: () => import(/* webpackChunkName: "hello-world" */ '@/views/HelloWorld.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
