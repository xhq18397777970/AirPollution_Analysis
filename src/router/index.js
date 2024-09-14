import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'
import Voice from '@/components/pollutionSearchBox/Voice.vue'
import Test from '@/views/Test.vue'


import Home from '@/components/Test/Home.vue'
import Login from '@/components/Test/Login.vue'
import WSPM2P5 from '@/components/wsPollution/wsPM25.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'index',
    component:Index
  },
  {
    path:'/voice',
    name:'voice',
    component:Voice
  },
  {
    path:'/a',
    name:'Test',
    component:Test
  },
  {
    path:'/login',
    name:'login',
    component:Login
  },
  {
    path:'/home',
    name:'home',
    component:Home
  },
  {
    path:'/ws',
    name:'ws',
    component:WSPM2P5
  },

]

const router = new VueRouter({
  routes
})

export default router
