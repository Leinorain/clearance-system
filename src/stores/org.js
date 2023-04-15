import { defineStore } from 'pinia'
import { doc, collection, query, where, getDoc, getDocs } from 'firebase/firestore'
import { useAuthStore } from '@/stores/auth'
import { useFirebaseStore } from '@/stores/firebase'
import { useStudentStore } from '@/stores/student'
import { useErrorsStore } from '@/stores/errors'

function getDb() {
    const firebase = useFirebaseStore()
    return firebase.getFirestore()
}

function handleError(e, message) {
    console.error(e)
    const errors = useErrorsStore()
    errors.add(message)
}

export const useOrgStore = defineStore('org', {
    state: () => ({
        orgIds: [],
        isOrgIdsLoading: false,
        orgData: {},
        loadingOrgData: {}
    }),
    actions: {
        async loadCurrentUserOrgs() {
            this.$reset()
            const db = getDb()
            const auth = useAuthStore()

            if(await auth.checkIfAdmin()) {
                await this.loadAllOrgs(db)
            } else {
                await this.loadStudentOrgs(auth.user.uid, db)
            }
        },
        async loadAllOrgs(db) {
            this.isOrgIdsLoading = true
            try {
                const docs = await getDocs(collection(db, 'organizations'))
                docs.forEach(doc => {
                    const orgId = doc.id
                    this.orgIds.push(orgId)
                    this.orgData[orgId] = { id: orgId, ...doc.data() }
                })
            } catch(e) {
                handleError(e, `Cannot load organizations: ${e.message}`)
            } finally {
                this.isOrgIdsLoading = false
            }
        },
        async loadStudentOrgs(userId, db) {
            const studentStore = useStudentStore()
            this.isOrgIdsLoading = true

            try {
                const student = await studentStore.getStudentInfo(userId)
                if(student) {
                    const orgs = collection(db, 'organizations_students')
                    const q = query(orgs, where('studentId', '==', student.id))
                    const docs = await getDocs(q)

                    this.orgIds = docs.docs.map(doc => doc.data().orgId)
                    this.orgIds.forEach(id => this.loadOrg(id, db))
                }
            } catch(e) {
                handleError(e, `Cannot load organizations: ${e.message}`)
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
                handleError(e, `Cannot load organization: ${e.message}`)
                // remove org id from orgIds
                this.orgIds.splice(this.orgIds.indexOf(id), 1)
            } finally {
                this.loadingOrgData[id] = false
            }
        }
    }
})