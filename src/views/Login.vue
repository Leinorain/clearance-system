<template>
    <div class="vw-100 vh-100 has-img-bg">
        <div class="container h-100">
            <div class="row align-items-center h-100">
                <div class="col-sm-12 col-lg-8">
                    <div class="container">
                        <h1 class="text-center">LOGO</h1>
                        <h4 class="text-center">Divine Word College of San Jose Online Clearance</h4>
                    </div>
                </div>
                <div class="col-sm-12 col-lg-4">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="onLogin">
                                <div class="mb-3">
                                    <label for="username" class="form-label">Username / ID Num</label>
                                    <input type="text" class="form-control" id="username" v-model="username">
                                </div>
                                <div class="mb-3">
                                    <label for="password" class="form-label">Password</label>
                                    <input type="password" class="form-control" id="password" v-model="password">
                                </div>
                                <div class="d-grid">
                                    <button type="submit" class="btn btn-success btn-lg">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { signInWithEmailAndPassword } from '@firebase/auth'
import { useFirebaseStore } from '@/stores/firebase'

const firebase = useFirebaseStore()
const auth = firebase.getAuth()

const username = ref('')
const password = ref('')

async function onLogin() {
    try {
        await signInWithEmailAndPassword(auth, username.value, password.value)
        console.log('login success')
    } catch(e) {
        // TODO: show error messages
        console.error(e)
    }
}
</script>