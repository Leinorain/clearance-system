<template>
    <div class="container p-3">
        <div class="row">
            <div class="col-sm-12 align-items-center text-center">
                <div v-if="isMemberRoleLoaded">
                    <img src="https://mdbootstrap.com/img/new/avatars/8.jpg" class="rounded-circle" alt="" style="width: 99px; height: 90px"/>
                    <div class="">
                        <p class="fw-bold m-1 h3">{{ `${memberRole.firstname} ${memberRole.lastname}` }}</p>
                        <p class="text-muted mb-0 h6">{{ memberRole.studentId }}</p>
                    </div>
                </div>
                <div v-if="isMemberRoleLoading">
                    <div class="spinner-grow text-success" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <div class="spinner-grow text-success" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <div class="spinner-grow text-success" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row py-3">
            
            <div class="col-5 px-1">
                <div class="text-center border border-success border-2 rounded">
                    <p class="w-100 bg-success text-white fw-bold fs-3 mb-0">Fines</p>
                    <p class="w-100 border-success fs-4 mb-0">
                        <div
                            v-if="isMemberRoleLoading || isAttendancesLoading"
                            class="spinner-border spinner-border-sm text-success"
                            role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <span v-else>{{ totalFine }}</span>
                    </p>
                </div>
            </div>


            <div class="col-5 px-1">
                <div class="text-center border border-success border-2 rounded">
                    <p class="w-100 bg-success text-white fw-bold fs-3 mb-0">Status</p>
                    <p class="w-100 border-success mb-0 fs-4 text-danger">Unapproved</p>
                </div>
            </div>

            <div class="col-2 px-1">
                <button type="button" class="btn btn-success btn-lg">Issue Clearance</button>
            </div>
        </div>
        <div class = "row">
            <table class="table text-center table-bordered ">
                <thead class = "bg-success text-white">
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Event Name</th>
                        <th scope="col">Attendance</th>
                        <th scope="col">Fines</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="event of events.loadedOrgEvents">
                        <td>{{ dayjs(event.date).format('YYYY-MM-DD') }}</td>
                        <td>{{ event.name }}</td>
                        <td v-if="isAttendancesLoading">
                            <div class="spinner-border spinner-border-sm text-success" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </td>
                        <td v-else>
                            {{ attendanceByEventId[event.id] ? 'Present' : 'Absent' }}
                        </td>
                        <td>{{ event.fine }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script setup>
import dayjs from 'dayjs'
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useRolesStore } from '@/stores/roles'
import { useEventsStore } from '@/stores/events'
import { useAttendancesStore } from '@/stores/attendances'
import { useErrorsStore } from '@/stores/errors'

const route = useRoute()
const roles = useRolesStore()
const events = useEventsStore()
const attendances = useAttendancesStore()
const errors = useErrorsStore()

const isMemberRoleLoading = ref(false)
const isMemberRoleLoaded = ref(false)
const memberRole = ref({})

const isAttendancesLoading = ref(false)
const attendanceByEventId = ref({})

const totalFine = computed(() => {
    return events.loadedOrgEvents.reduce(
        (sum, event) => attendanceByEventId.value[event.id] ? sum : (sum + event.fine),
        0
    )
})

async function loadOrgMember() {
    const { orgId, studentId } = route.params
    try {
        isMemberRoleLoading.value = true
        memberRole.value = await roles.getOrgMemberRole(orgId, studentId)
        isMemberRoleLoaded.value = true
    } catch(e) {
        errors.add(`Cannot load member info: ;${e.message}`)
    } finally {
        isMemberRoleLoading.value = false
    }
}

async function loadOrgEvents() {
    const { orgId } = route.params
    try {
        await events.loadOrgEvents(orgId)
    } catch(e) {
        errors.add(`Cannot load events: ${e.message}`)
    }
}

async function loadMemberAttendances() {
    const { orgId, studentId } = route.params
    try {
        isAttendancesLoading.value = true
        const records = await attendances.getMemberAttendances(orgId, studentId)
        for(const attendance of records) {
            attendanceByEventId.value[attendance.eventId] = attendance
        }
    } catch(e) {
        errors.add(`Cannot load attendances: ${e.message}`)
    } finally {
        isAttendancesLoading.value = false
    }
}

onMounted(async () => {
    await loadOrgMember()
    await loadOrgEvents()
    await loadMemberAttendances()
})
</script>
