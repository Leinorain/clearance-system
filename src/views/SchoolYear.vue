<template>
    <div class="container pt-2">
        <div class="d-flex align-items-center mb-2">
            <h1 class="me-auto">School Years</h1>
            <button class="btn btn-primary btn-lg">New School Year</button>
        </div>
        <div class="container">
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>School Year</th>
                        <th>Current</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="schoolYear in data">
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
                                :class="{'btn-danger': !schoolYear.current, 'btn-secondary': schoolYear.current}">
                                Del
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useSchoolYearsStore } from '@/stores/schoolYears'
import { useErrorsStore } from '@/stores/errors'

const errors = useErrorsStore()
const schoolYears = useSchoolYearsStore()
let isLoadingData = ref(false)
const data = ref([])

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
})
</script>