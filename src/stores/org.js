import { defineStore } from 'pinia'
import { doc, collection, query, where, getDoc, getDocs } from 'firebase/firestore'
import { useAuthStore } from '@/stores/auth'
import { useFirebaseStore } from '@/stores/firebase'

function getDb() {
    const firebase = useFirebaseStore()
    return firebase.getFirestore()
}

export const useOrgStore = defineStore('org', {
    state: () => ({
        orgIds: [],
        isOrgIdsLoading: false,
        orgData: {},
        orgDataErrors: {},
        loadingOrgData: {}
    }),
    actions: {
        async loadCurrentUserOrgs() {
            const db = getDb()
            const auth = useAuthStore()
            const orgs = collection(db, 'students_organizations')
            const q = query(orgs, where('student_id', '==', auth.user.uid))

            this.isOrgIdsLoading = true
            try {
                const docs = await getDocs(q)
                this.orgIds = docs.docs.map(doc => {
                    const { org_id } = doc.data()
                    return org_id
                })
                this.orgIds.forEach(id => this.loadOrg(id, db))
            } finally {
                this.isOrgIdsLoading = false
            }
        },
        async loadOrg(id, db) {
            const ref = doc(db, 'organizations', id)

            this.loadingOrgData[id] = true
            try {
                const snapshot = await getDoc(ref)
                if(!snapshot.exists()) {
                    throw new Error('Organization does not exist')
                }

                this.orgData[id] = { id, ...snapshot.data() }
            } catch(e) {
                this.orgDataErrors[id] = e
            } finally {
                this.loadingOrgData[id] = false
            }
        }
    }
})