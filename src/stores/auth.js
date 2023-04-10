import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({ user: null }),
    getters: {
        isLoggedIn: (state) => Boolean(state.user),
        userDisplayName: (state) => state.user ? state.user.displayName : ''
    }
})