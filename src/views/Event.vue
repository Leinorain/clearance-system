<template>
    <div class="container p-3">
        <h1>{{ eventData.name }}</h1>
        <div class = "row">
            <div class="col-md-8 mb-2">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="ID Number" v-model="addAttendanceInput">
                    <button class="btn btn-success" @click="addAttendance">
                        <i class="bi bi-plus-circle"></i>
                        Add Attendance
                    </button>
                </div>
            </div>
            <!-- office admin no add member button -->
            <div class = "col-md-4 mb-2">
                <button class="btn btn-success" style="width: 100%">
                    <i class="bi bi-person-badge p-1"></i>
                    Start RFID Attendance
                </button>
            </div>
        </div>
        <!-- office admin no add member button -->

        <div class = "row">
            <table class="table text-center table-bordered ">
                <thead class = "bg-success text-white">
                    <tr>
                        <th>ID Num</th>
                        <th>Last Name</th>
                        <th>First Name</th>
                        <th>Course</th>
                        <th>Year</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="member in membersAttended"> <!-- link -->
                        <td>{{ member.studentId }}</td>
                        <td>{{ member.lastname }}</td>
                        <td>{{ member.firstname }}</td>
                        <td>{{ member.course }}</td>
                        <td>{{ member.year }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import { useRoute } from 'vue-router'
    import { useEventsStore } from '@/stores/events'
    import { useErrorsStore } from '@/stores/errors'

    const route = useRoute()
    const events = useEventsStore()
    const errors = useErrorsStore()

    const eventData = ref({})
    const addAttendanceInput = ref('')
    const isAddingAttendance = ref(false)
    const membersAttended = ref([])

    async function addAttendance() {
        try {
            isAddingAttendance.value = true
            const attendance = await events.addAttendance(eventData.value, addAttendanceInput.value)
            membersAttended.value.push(attendance)
        } catch(e) {
            console.error(e)
            errors.add(`Cannot add attendance: ${e.message}`)
        } finally {
            isAddingAttendance.value = false
        }
    }

    async function loadEventData() {
        const { eventId } = route.params
        try {
            eventData.value = await events.getEvent(eventId)
        } catch(e) {
            errors.add(`Cannot load event: ${e.message}`)
        }
    }

    async function loadAttendances() {
        const { orgId, eventId } = route.params
        try {
            membersAttended.value = await events.getAttendances(orgId, eventId)
        } catch(e) {
            errors.add(`Cannot load attendances: ${e.message}`)
        }
    }
    
    onMounted(async () => {
        await loadEventData()
        await loadAttendances()
    })
</script>
