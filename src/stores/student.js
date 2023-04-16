import { defineStore } from 'pinia'
import { query, collection, where, getDocs } from 'firebase/firestore'
import { useFirebaseStore } from '@/stores/firebase'

export const useStudentStore = defineStore('student', {
    state: () => ({ info: null, isInitialized: false }),
    actions: {
        async getStudentInfo(userId) {
            if(this.isInitialized) {
                return this.info
            }

            const firebase = useFirebaseStore()
            const db = firebase.getFirestore()
            const students = collection(db, 'students')
            const q = query(students, where('userId', '==', userId))

            const snapshot = await getDocs(q)
            this.isInitialized = true
            if(!snapshot.empty) {
                const [ doc ] = snapshot.docs
                this.info = { id: doc.id, ...doc.data() }
            }
            return this.info
        }
    }
})