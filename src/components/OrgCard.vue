<template>
    <div class="card btn" @click="onClick">
        <div v-if="isLoading" class="card-body">
            <p class="card-text placeholder-glow text-start">
                <span class="placeholder placeholder-lg col-12"></span>
                <span class="placeholder placeholder-lg col-8"></span>
            </p>
        </div>
        <div v-else class="card-body">
            <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                    <img :src="props.data.thumbnail" class="rounded-circle org-img">
                    <div class="ms-3 card-text">
                        <p class="fw-bold mb-1">{{ props.data.name }}</p>
                    </div>
                </div>
                <span v-if="isApproved" class="badge rounded-pill text-bg-success">Approved</span>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue'
import router from '@/plugins/router'

const props = defineProps({
    id: String,
    data: Object,
    isLoading: Boolean
})

const isApproved = computed(() => props.data.status === 'approved')

function onClick() {
    router.push({ name: 'organization', params: { orgId: props.id } })
}
</script>
<style>
img.org-img {
    width: 45px;
    height: 45px;
}
</style>