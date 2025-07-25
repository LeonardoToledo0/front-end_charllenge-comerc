import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { toast } from 'vue3-toastify'

export const authGuard = (_to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const loggedUserStr = localStorage.getItem('loggedUser')

    if (loggedUserStr) {
        try {
            const loggedUser = JSON.parse(loggedUserStr)
            if (loggedUser.status !== 'inactive') {
                next()
            } else {
                toast.error('Usuário inativo. Por favor, faça login para continuar.')
                next({ name: 'login' })
            }
        } catch (error) {
            toast.error('Erro ao verificar usuário. Por favor, faça login.')
            next({ name: 'login' })
        }
    } else {
        toast.error('Usuário não logado. Por favor, faça login.')
        next({ name: 'login' })
    }
}
