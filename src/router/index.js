import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EmployeeListView from '../views/EmployeeListView.vue'
import EmployeeDetails from '../views/EmployeeDetails.vue'
import EmployeeCreate from '@/views/EmployeeCreate.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/employees',
    name: 'employees',
    component: EmployeeListView,
  },
  {
    path: '/employees/:id',
    name: 'EmployeeDetails',
    component: EmployeeDetails
  },
  {
    path:'/create',
    name:'CreateEmployee',
    component: EmployeeCreate
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
