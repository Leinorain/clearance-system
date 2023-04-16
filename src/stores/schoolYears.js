import { defineStore } from 'pinia'
import { collection, doc, setDoc, getDocs, deleteDoc } from 'firebase/firestore'
import { useFirebaseStore } from '@/stores/firebase'

function getDb() {
    const firebase = useFirebaseStore()
    return firebase.getFirestore()
}

export const useSchoolYearsStore = defineStore('schoolYear', {
    actions: {
        async createSchoolYear({ id, current }) {
            console.log(id, current)
            const db = getDb()
            await setDoc(doc(db, 'school_years', id), { current })
            return { id, current }
        },
        async getSchoolYears() {
            const db = getDb()
            const docs = await getDocs(collection(db, 'school_years'))
            return docs.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        },
        async deleteSchoolYear(id) {
            const db = getDb()
            await deleteDoc(doc(db, 'school_years', id))
        }
    }
})
