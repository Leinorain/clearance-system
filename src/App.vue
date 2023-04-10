<template>
    <div class="container-fluid p-0">
        <div v-if="checkedAuth">
            <router-view></router-view>
        </div>
        <div v-else class="d-flex justify-content-center align-items-center min-vh-100">
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
</template>
<script setup>
import { ref } from 'vue'
import { onAuthStateChanged } from '@firebase/auth'
import { useFirebaseStore } from '@/stores/firebase'
import { useAuthStore } from '@/stores/auth'
import router from '@/plugins/router'

const firebase = useFirebaseStore()
const auth = useAuthStore()

const checkedAuth = ref(false)

onAuthStateChanged(firebase.getAuth(), (user) => {
    checkedAuth.value = true
    if(user) {
        auth.user = user
        router.push({ name: 'home' })
    } else {
        auth.$reset()
        router.push({ name: 'login' })
    }
})
</script>
