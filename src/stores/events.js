import { defineStore, acceptHMRUpdate } from 'pinia'
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore'
import { useFirebaseStore } from '@/stores/firebase'
import normalizeDoc from '@/util/normalizeDoc'

function getDb() {
    const firebase = useFirebaseStore()
    return firebase.getFirestore()
}

export const useEventsStore = defineStore('events', {
    actions: {
        async getOrgEvents(orgId, schoolYear) {
            const db = getDb()
            const colRef = collection(db, 'events')
            const q = query(
                colRef,
                where('orgId', '==', orgId),
                where('schoolYear', '==', schoolYear),
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
