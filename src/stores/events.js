import { defineStore, acceptHMRUpdate } from 'pinia'
import { collection, query, where, orderBy, addDoc, getDocs } from 'firebase/firestore'
import { useFirebaseStore } from '@/stores/firebase'
import { useSchoolYearsStore } from '@/stores/schoolYears'
import normalizeDoc from '@/util/normalizeDoc'

function getDb() {
    const firebase = useFirebaseStore()
    return firebase.getFirestore()
}

export const useEventsStore = defineStore('events', {
    actions: {
        async createOrgEvent(data) {
            const schoolYears = useSchoolYearsStore()
            const currentSy = await schoolYears.getCurrentSchoolYear()

            const db = getDb()
            const colRef = collection(db, 'events')
            const doc = await addDoc(colRef, { ...data, schoolYear: currentSy.id })
            return { id: doc.id, ...data }
        },
        async getOrgEvents(orgId) {
            const schoolYears = useSchoolYearsStore()
            const currentSy = await schoolYears.getCurrentSchoolYear()

            const db = getDb()
            const colRef = collection(db, 'events')
            const q = query(
                colRef,
                where('orgId', '==', orgId),
                where('schoolYear', '==', currentSy.id),
                orderBy('date')
            )
            const snapshot = await getDocs(q)
            return snapshot.docs.map(normalizeDoc)
        }
    }
})

if(import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useEventsStore, import.meta.hot))
}
