<template>
    <div class="container pt-2">
        <div class="d-flex align-items-center mb-2">
            <h1 class="me-auto">School Years</h1>
            <button class="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#newSchoolYearModal">New School Year</button>
        </div>
        <div class="container">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>School Year</th>
                        <th>Current</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(schoolYear, index) in data" :class="{'table-active': schoolYear.current}">
                        <td>{{ schoolYear.id }}</td>
                        <td>{{ schoolYear.current ? 'Yes' : 'No' }}</td>
                        <td class="d-grid gap-1 d-flex">
                            <button
                                type="button"
                                class="btn btn-sm"
                                :class="{'btn-primary': !schoolYear.current, 'btn-secondary': schoolYear.current}"
                                :disabled="schoolYear.current">
                                Set
                            </button>
                            <button
                                type="button"
                                class="btn btn-sm"
                                :class="{'btn-danger': !schoolYear.current, 'btn-secondary': schoolYear.current}"
                                @click="askToDelete(index)">
                                Del
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="modal fade" tabindex="-1" id="newSchoolYearModal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">New School Year</h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        :disabled="isCreatingNewSchoolYear">
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label for="schoolYearInput" class="form-label">School Year</label>
                            <input type="text" class="form-control" id="schoolYearInput" v-model="newSchoolYear">
                        </div>
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="setAsCurrentCheckbox" v-model="newSchoolYearCurrent">
                            <label for="setAsCurrentCheckbox" class="form-check-label">Set as current</label>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                        :disabled="isCreatingNewSchoolYear">
                        Close
                    </button>
                    <button
                        type="button"
                        class="btn btn-primary"
                        :disabled="isCreatingNewSchoolYear"
                        @click="createNewSchoolYear">
                        <span v-if="isCreatingNewSchoolYear" class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                        Save
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" tabindex="-1" id="deleteSchoolYearModal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Delete School Year</h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        :disabled="isDeletingSchoolYear">
                    </button>
                </div>
                <div class="modal-body">
                    <p>Are you sure you want to delete the School Year: {{ syToDelete }}</p>
                </div>
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                        :disabled="isDeletingSchoolYear">
                        Close
                    </button>
                    <button
                        type="button"
                        class="btn btn-danger"
                        :disabled="isDeletingSchoolYear"
                        @click="deleteSchoolYear">
                        <span v-if="isDeletingSchoolYear" class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
// TODO: refactor modals
import { Modal } from 'bootstrap'
import { ref, onMounted, computed } from 'vue'
import { useSchoolYearsStore } from '@/stores/schoolYears'
import { useErrorsStore } from '@/stores/errors'

const errors = useErrorsStore()
const schoolYears = useSchoolYearsStore()

let isLoadingData = ref(false)
const data = ref([])

let newSchoolYearModal = null
const isCreatingNewSchoolYear = ref(false)
const newSchoolYear = ref('')
const newSchoolYearCurrent = ref(false)

let deleteSchoolYearModal = null
const isDeletingSchoolYear = ref(false)
const indexToDelete = ref(-1)
const syToDelete = computed(() => {
    return indexToDelete.value > -1 ? data.value[indexToDelete.value].id : ''
})

onMounted(async () => {
    try {
        isLoadingData.value = true
        data.value = await schoolYears.getSchoolYears()
    } catch(e) {
        console.error(e)
        errors.add(`Cannot load school years: ${e.message}`)
    } finally {
        isLoadingData.value = false
    }

    newSchoolYearModal = new Modal('#newSchoolYearModal')
    deleteSchoolYearModal = new Modal('#deleteSchoolYearModal')
})

function closeNewSchoolYearModal() {
    if(newSchoolYearModal) {
        newSchoolYear.value = ''
        newSchoolYearCurrent.value = false
        newSchoolYearModal.hide()
    }
}

async function createNewSchoolYear() {
    let previousSyIdx = data.value.findIndex(sy => sy.current)
    isCreatingNewSchoolYear.value = true
    try {
        const sy = await schoolYears.createSchoolYear({
            id: newSchoolYear.value,
            current: newSchoolYearCurrent.value
        })
        data.value.push(sy)
        closeNewSchoolYearModal()

        if(sy.current && previousSyIdx > -1) {
            const previousSy = data.value[previousSyIdx]
            const updatedSy = await schoolYears.createSchoolYear({
                id: previousSy.id,
                current: false
            })
            data.value[previousSyIdx] = updatedSy
        }
    } catch(e) {
        console.error(e)
        errors.add(`Cannot create new school year: ${e.message}`)
    } finally {
        isCreatingNewSchoolYear.value = false
    }
}

function askToDelete(idx) {
    indexToDelete.value = idx
    deleteSchoolYearModal.show()
}

async function deleteSchoolYear() {
    if(indexToDelete.value > -1) {
        isDeletingSchoolYear.value = true
        try {
            const sy = data.value[indexToDelete.value]
            await schoolYears.deleteSchoolYear(sy.id)
            data.value.splice(indexToDelete.value, 1)
            indexToDelete.value = -1
            deleteSchoolYearModal.hide()
        } catch(e) {
            console.error(e)
            errors.add(`Cannot delete school year: ${e.message}`)
        } finally {
            isDeletingSchoolYear.value = false
        }
    }
}
</script>