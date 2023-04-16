import { defineStore } from 'pinia'
import { collection, getDocs } from 'firebase/firestore'
import { useFirebaseStore } from '@/stores/firebase'

function getDb() {
    const firebase = useFirebaseStore()
    return firebase.getFirestore()
}

export const useSchoolYearsStore = defineStore('schoolYear', {
    actions: {
        async getSchoolYears() {
            const db = getDb()
            const docs = await getDocs(collection(db, 'school_years'))
            return docs.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        }
    }
})
