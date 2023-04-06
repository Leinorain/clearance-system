<template>
    <div class="card btn">
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                    <img :src="props.thumbnail" class="rounded-circle org-img">
                    <div class="ms-3 card-text">
                        <p class="fw-bold mb-1">{{ props.name }}</p>
                    </div>
                </div>
                <span v-if="props.isApproved" class="badge rounded-pill text-bg-success">Approved</span>
            </div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    id: String,
    name: String,
    thumbnail: String,
    isApproved: Boolean
})
</script>
<style>
img.org-img {
    width: 45px;
    height: 45px;
}
</style>