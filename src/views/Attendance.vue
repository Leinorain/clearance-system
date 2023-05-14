<template>
    <Header
        v-if="organization"
        greeting="Welcome to"
        :name="organization.name">
    </Header>
        <div class="container p-3">
            <div class = "row">
                <div class="col-md-8 mb-2">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="ID Number" v-model="addAttendance">
                        <button class="btn btn-success">
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
                        <tr class="clickable-row"> <!-- link -->
                            <td>00001</td>
                            <td>Firstname</td>
                            <td>Lastname</td>
                            <td>BSIT</td>
                            <td>1</td>
                        </tr>
                        <tr class="clickable-row" v-for="member in orgMemberRoles"> <!-- link -->
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

<style>
    .clickable-row { 
        cursor: pointer; 
    }
</style>

<script setup>
    import { ref, computed, onMounted } from 'vue'
    import { useRoute } from 'vue-router'
    import Header from '@/components/Header.vue'
    import { useOrgStore } from '@/stores/org'
    import { useRolesStore } from '@/stores/roles'
    import { useErrorsStore } from '@/stores/errors'

    const route = useRoute()
    const org = useOrgStore()
    const roles = useRolesStore()
    const errors = useErrorsStore()

    const addAttendance = ref('')
    const orgMemberRoles = ref([])
    const orgAdminRoles = ref([])


    const organization = computed(() => {
        return org.orgData[route.params.orgId]
    })

    async function loadOrgInfo() {
        if(!organization.value) {
            try {
                await org.loadOrg(route.params.orgId)
            } catch(e) {
                errors.add(`Cannot load org: ${e.message}`)
            }
        }
    }

    async function loadOrgMembers() {
        const { orgId } = route.params
        if(roles.isSysAdmin || roles.orgAdminRoles[orgId]) {
            orgMemberRoles.value = await roles.getOrgMemberRoles(orgId)
        }
    }

    async function loadOrgAdmins() {
        if(roles.isSysAdmin) {
            try {
                orgAdminRoles.value = await roles.getOrgAdminRoles(route.params.orgId)
            } catch(e) {
                errors.add(`Cannot load org admins: ${e.message}`)
            }
        }
    }

    onMounted(async () => {
        await loadOrgInfo()
        await loadOrgMembers()
        await loadOrgAdmins()
    })
</script>
