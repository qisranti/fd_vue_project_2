import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MarcaView from '@/views/marcas/MarcaView.vue'
import CelularesView from '@/views/celulares/CelularesView.vue'
import CelularesMarcaView from '@/views/marcas/CelularesMarca.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/marcas',
    name: 'marcas',
    component: MarcaView
  },
  {
    path: '/celulares',
    name: 'celulares',
    component: CelularesView
  },
  {
    path: '/marcas/:id/celulares',
    name: 'marcaCelulares',
    component: CelularesMarcaView 
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
