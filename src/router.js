import { createRouter, createWebHistory } from 'vue-router'
import ApartmentsIndex from './pages/apartments/Index.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/apartments',
            name: 'apartments.index',
            component: ApartmentsIndex,
        }
    ]
})

export { router }