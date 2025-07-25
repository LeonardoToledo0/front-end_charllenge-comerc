import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// Importar as rotas de features
import { authRoutes } from '../features/auth'
import { usersRoutes } from '../features/users'
import { consumerRoutes } from '../features/consumer'
import { rentalsRoutes } from '../features/rentals'
import { moviesRoutes } from '../features/movies'

// Importar páginas diretamente
import Layout from '../layout/Layout.vue'
import Home from '../features/pages/Home.vue'

// Importar Pinia e a store
import { useAuthStore } from '../features/auth'
import { pinia } from '../main'



export const routes: RouteRecordRaw[] = [
    { path: '/', component: Home, name: 'Home' },
    { path: '/auth', children: [...authRoutes] },
    {
        path: '/',
        component: Layout,
        children: [...moviesRoutes, ...usersRoutes, ...consumerRoutes, ...rentalsRoutes],
    },
    { path: '/:pathMatch(.*)*', name: 'not-found', redirect: '/auth/login' },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})


router.beforeEach((to, _from, next) => {

    const authStore = useAuthStore(pinia)
    authStore.loadUser()

    const loggedUser = authStore.user

    const publicPages = new Set(['login', 'register', 'not-found', 'Home'])
    const routeName = to.name?.toString() || ''

    if (!loggedUser && !publicPages.has(routeName)) {
        return next({ name: 'login' })
    }

    if (loggedUser && to.path === '/') {
        return next({ name: 'Filmes' })
    }

    next()
})

export default router
