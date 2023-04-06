import { defineStore } from 'pinia'
import users from '@/data/users'

export const useAuthStore = defineStore('auth', {
    state: () => ({ user: null, users }),
    getters: {
        isLoggedIn: (state) => Boolean(state.user)
    },
    actions: {
        async checkIsLoggedIn() {
            return this.isLoggedIn
        },
        async login(username, password) {
            const user = this.users.find(
                u => u.username === username && u.password === password
            )
            if(!user) {
                throw new Error('Login Failed')
            }
            this.user = user
        },
        async logout() {
            this.user = null
        }
    }
})