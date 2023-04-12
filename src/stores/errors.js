import { nanoid } from 'nanoid/non-secure'
import { defineStore } from 'pinia'

export const useErrorsStore = defineStore('errors', {
    state: () => ({ errors: {} }),
    actions: {
        add(message) {
            this.errors[nanoid(5)] = message
        },
        remove(id) {
            delete this.errors[id]
        }
    }
})