import { defineStore, acceptHMRUpdate } from 'pinia'
import { collection, query, where, getDocs, orderBy, getDoc, doc, startAt } from 'firebase/firestore'
import { useAuthStore } from '@/stores/auth'
import { useFirebaseStore } from '@/stores/firebase'
import { useSchoolYearsStore } from '@/stores/schoolYears'
import normalizeDoc from '@/util/normalizeDoc'

function getDb() {
    const firebase = useFirebaseStore()
    return firebase.getFirestore()
}

function isRole(roleType) {
    return role => role.type === roleType
}

export const useRolesStore = defineStore('roles', {
    state: () => ({
        userRoles: [],
        studentRoles: [],
        isUserRolesInitialized: false,
        isStudentRolesInitialized: false
    }),
    getters: {
        orgAdminRoles: (state) => state.userRoles
            .filter(isRole('orgadmin'))
            .reduce((acc, role) => Object.assign(acc, { [role.orgId]: role }), {}),
        sysAdminRole: (state) => state.userRoles.find(isRole('sysadmin')),
        studentRole: (state) => state.userRoles.find(isRole('student')),
        isSysAdmin: (state) => Boolean(state.sysAdminRole),
        isStudent: (state) => Boolean(state.studentRole)
    },
    actions: {
        async initializeUserRoles() {
            const auth = useAuthStore()
            if(auth.isLoggedIn) {
                const db = getDb()
                const roles = collection(db, 'roles')
                const q = query(roles, where('userId', '==', auth.user.uid))
                const docs = await getDocs(q)
                this.userRoles = docs.docs.map(normalizeDoc)
                this.isUserRolesInitialized = true
            }
        },
        async initializeStudentRoles() {
            if(this.isUserRolesInitialized) {
                if (this.isStudent) {
                    const db = getDb()
                    const roles = collection(db, 'roles')
                    const q = query(roles, where('studentId', '==', this.studentRole.studentId))
                    const docs = await getDocs(q)
                    this.studentRoles = docs.docs
                        .map(normalizeDoc)
                        .filter(doc => doc.type === 'orgmember')
                }
                this.isStudentRolesInitialized = true
            }
        },
        async getOrgAdminRoles(orgId) {
            const db = getDb()
            const roles = collection(db, 'roles')
            const q = query(roles, where('type', '==', 'orgadmin'), where('orgId', '==', orgId))
            const docs = await getDocs(q)
            return docs.docs.map(normalizeDoc)
        },
        async getOrgMemberRoles(orgId, lastId) {
            const schoolYears = useSchoolYearsStore()
            const currentSy = await schoolYears.getCurrentSchoolYear()

            const db = getDb()
            const rolesCol = collection(db, 'roles')

            const queryConstraints = [
                where('type', '==', 'orgmember'),
                where('organizationId', '==', orgId),
                where('schoolYear', '==', currentSy.id),
                orderBy('lastname')
            ]
            if(lastId) {
                const lastDoc = await getDoc(doc(rolesCol, lastId))
                queryConstraints.push(startAt(lastDoc))
            }

            const q = query(rolesCol, ...queryConstraints)
            const docs = await getDocs(q)
            return docs.docs.map(normalizeDoc)
        }
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useRolesStore, import.meta.hot))
}