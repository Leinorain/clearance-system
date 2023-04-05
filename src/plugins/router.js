import { createRouter, createWebHistory } from 'vue-router'

const authenticatedRoutes = [
    { path: '', component: () => import('@/views/Home.vue')}
]

const routes = [
    { path: '', name: 'home', component: () => import('@/views/Authenticated.vue'), children: authenticatedRoutes },
    { path: '/login', name: 'login', component: () => import('@/views/Login.vue') },
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router