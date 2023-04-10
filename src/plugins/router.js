import { useAuthStore } from '../stores/auth'
import { createRouter, createWebHistory } from 'vue-router'

const authenticatedRoutes = [
    {
        path: '',
        name: 'home',
        component: () => import('@/views/Home.vue')
    }
]

const routes = [
    {
        path: '',
        component: () => import('@/views/Authenticated.vue'),
        children: authenticatedRoutes,
        meta: { requiresAuth: true }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue')
    },
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

router.beforeEach((to, from) => {
    const auth = useAuthStore()

    if(to.meta.requiresAuth && !auth.isLoggedIn) {
        return { name: 'login' }
    }
})

export default router