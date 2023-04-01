<template>
    <div class="container-fluid p-0">
        <router-view></router-view>
    </div>
</template>
<script setup>
import { onMounted } from 'vue';
import router from './plugins/router';

onMounted(() => {
    router.push({ name: 'login' })
})
</script>
