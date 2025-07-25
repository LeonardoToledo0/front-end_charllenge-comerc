import { defineStore } from 'pinia'
import type { UserRegister } from '../../users/types/interface.user'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as UserRegister | null,
    }),
    actions: {
        loadUser() {
            const data = localStorage.getItem('loggedUser')
            if (data) this.user = JSON.parse(data)
        },
        setUser(user: UserRegister) {
            this.user = user
            localStorage.setItem('loggedUser', JSON.stringify(user))
        },
        logout() {
            this.user = null
            localStorage.removeItem('loggedUser')
        }
    }
})
