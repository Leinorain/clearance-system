<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div class="container-fluid">
            <a href="#" class="navbar-brand"><img src="@/assets/img/navbar-logo.svg" alt=""></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div ref="navbarToggle" class="collapse navbar-collapse" id="navbarContent">
                <ul class="navbar-nav text-uppercase ms-auto">
                    <li class="nav-item">
                        <a
                            class="nav-link"
                            :class="{active: $route.name === 'home'}"
                            @click="navigate({name: 'home'})">
                            {{ auth.isSystemAdmin ? 'Courses' : 'Home' }}
                        </a>
                    </li>
                    <li v-if="auth.isSystemAdmin" class="nav-item">
                        <a
                            class="nav-link"
                            :class="{active: $route.name === 'students'}"
                            @click="navigate({name: 'students'})">
                            Students
                        </a>
                    </li>
                    <li v-if="auth.isSystemAdmin" class="nav-item">
                        <a
                            class="nav-link"
                            :class="{active: $route.name === 'school-year'}"
                            @click="navigate({name: 'school-year'})">
                            School Year
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" @click="onLogout">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="pt-5 pb-2"></div>
    <router-view></router-view>
</template>
<script setup>
import { ref } from 'vue'
import { Collapse } from 'bootstrap'
import { signOut } from '@firebase/auth'
import { useAuthStore } from '@/stores/auth'
import { useFirebaseStore } from '@/stores/firebase'
import router from '@/plugins/router'

const auth = useAuthStore()

const navbarToggle = ref(null)

function navigate(to) {
    console.log(router.currentRoute)
    router.push(to)
    const toggle = new Collapse(navbarToggle.value)
    toggle.hide()
}

async function onLogout() {
    try {
        const firebase = useFirebaseStore()
        const auth = firebase.getAuth()
        await signOut(auth)
    } catch(e) {
        // TODO: show error messages
        console.error(e)
    }
}
</script>