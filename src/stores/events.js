import { defineStore, acceptHMRUpdate } from 'pinia'
import { collection, doc, query, where, orderBy, addDoc, getDoc, getDocs } from 'firebase/firestore'
import { useFirebaseStore } from '@/stores/firebase'
import { useSchoolYearsStore } from '@/stores/schoolYears'
import { useRolesStore } from '@/stores/roles'
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
        },
        async getEvent(eventId) {
            const db = getDb()
            const eventDoc = await getDoc(doc(db, 'events', eventId))
            if(!eventDoc.exists()) {
                throw new Error('Event not found')
            }
            return normalizeDoc(eventDoc)
        },
        async addAttendance(event, studentId) {
            const roles = useRolesStore()
            const memberRole = await roles.getOrgMemberRole(event.orgId, studentId)

            const db = getDb()
            const colRef = collection(db, 'attendances')
            const attendanceDoc = await addDoc(colRef, {
                eventId: event.id,
                eventName: event.name,
                studentId: memberRole.studentId,
                studentFirstname: memberRole.firstname,
                studentLastname: memberRole.lastname,
                studentCourse: memberRole.course,
                studentYear: memberRole.year
            })
            console.log(attendanceDoc.data)

            return normalizeDoc(attendanceDoc)
        },
        async getAttendances(orgId, eventId) {
            const db = getDb()
            const colRef = collection(db, 'attendances')
            const q = query(
                colRef,
                where('orgId', '==', orgId),
                where('eventId', '==', eventId),
                orderBy('studentLastname')
            )
            const snapshot = await getDocs(q)
            return snapshot.docs.map(normalizeDoc)
        }
    }
})

if(import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useEventsStore, import.meta.hot))
}
