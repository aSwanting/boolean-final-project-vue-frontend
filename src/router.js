import { createRouter, createWebHistory } from 'vue-router'
import ApartmentsIndex from './pages/apartments/Index.vue'
import Homepage from './pages/Home.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Homepage,
        },
        {
            path: '/apartments',
            name: 'apartments.index',
            component: ApartmentsIndex,
        }
    ]
})

export { router }