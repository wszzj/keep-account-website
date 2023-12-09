import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Money from '@/views/Money.vue'
import Label from '@/views/Label.vue'
import Statistics from '@/views/Statistics.vue'
import Notfound from '@/views/Notfound.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect:'/money'
  },
  {
    path: '/money',
    name: 'money',
    component: Money
  },
  {
    path: '/label',
    name: 'label',
    component: Label
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: Statistics
  },
  {
    path: '*',
    name: 'notfound',
    component: Notfound
  }
]

const router = new VueRouter({
  routes
})

export default router
