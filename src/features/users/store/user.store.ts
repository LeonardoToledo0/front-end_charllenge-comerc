import { defineStore } from 'pinia'
import type { UserRegister } from '../../users/types/interface.user'

export const useUserStore = defineStore('users', {
    state: () => ({
        users: [] as UserRegister[],
    }),

    actions: {
        loadUsers() {
            const data = localStorage.getItem('users')
            if (data) this.users = JSON.parse(data)
        },

        saveUsers() {
            localStorage.setItem('users', JSON.stringify(this.users))
        },

        createUser(user: UserRegister) {
            this.users.push(user)
            this.saveUsers()
        },

        updateUser(updatedUser: UserRegister) {
            const idx = this.users.findIndex(u => u.id === updatedUser.id)
            if (idx !== -1) {
                this.users[idx] = updatedUser
                this.saveUsers()
            }
        },

        findByDocumentAndPassword(document: string, password: string) {
            return this.users.find(u => u.document === document && u.password === password)
        }
    }
})