<template>
    <div class="vw-100 vh-100 has-img-bg">
        <div class="container-fluid h-100">
            <div class="row align-items-center h-100">
                                            
                <div class="col-sm-12 col-lg-7 h-100 bg-success" style="--bs-bg-opacity: .7;">
                    <div class="h-100">
                        <div class="row align-items-center h-100">
                            <div class="col-sm-12 col-lg-12 text-center">
                                <img src = "@/assets/img/DWCSJLogo.png" alt = "logo" width = "150px"/>
                                <p></p>
                                <h4 class="text-white">Web Based Online Clearance</h4>
                                <h4 class="text-white">with ESP32 - RFID Attendance System</h4>
                                
                                <p class="text-white fst-italic">Divine Word College of San Jose Online Clearance</p>
                    
                                <div class = "mobileViewShowLoginButton">
                                    <button class = "btn btn-success btn-lg col-6" data-bs-toggle="modal" href="#loginModal">
                                        Login 
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-sm-12 col-lg-5 p-5 pcViewLoginCard">
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
                                    <button
                                        type="submit"
                                        class="btn btn-success btn-lg"
                                        :disabled="isLoggingIn">
                                        <span v-if="isLoggingIn" class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
    <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="card">
                <div class="card-body">
                    <div class="form-title text-center mb-5">
                        <h4>Login</h4>
                    </div>
                    <form @submit.prevent="onLogin">
                        <div class="mb-3">
                            <label for="username" class="form-label">Username / ID Num</label>
                            <input type="text" class="form-control" id="username" v-model="username"> <!-- id -->
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" v-model="password"> <!-- id -->
                        </div>
                        <div class="d-grid">
                            <button
                                type="submit"
                                class="btn btn-success btn-lg"
                                :disabled="isLoggingIn">
                                <span v-if="isLoggingIn"  aria-hidden="true"></span>
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
    .mobileViewShowLoginButton {
        display: block; 
    }

    @media (min-width: 992px) {
        .mobileViewShowLoginButton {   
        display: none; 
        }
    }

    .pcViewLoginCard {
        display: none; 
    }

    @media (min-width: 992px) {
        .pcViewLoginCard {   
        display: block; 
        }
    }
</style>

<script setup>
import { ref } from 'vue'
import { signInWithEmailAndPassword } from '@firebase/auth'
import { useFirebaseStore } from '@/stores/firebase'
import { useErrorsStore } from '@/stores/errors';

const errors = useErrorsStore()
const firebase = useFirebaseStore()
const auth = firebase.getAuth()

const username = ref('')
const password = ref('')
const isLoggingIn = ref(false)

async function onLogin() {
    isLoggingIn.value = true
    try {
        await signInWithEmailAndPassword(auth, username.value, password.value)
        console.log('login success')
    } catch(e) {
        errors.add('Login failed.')
        console.error(e)
    } finally {
        isLoggingIn.value = false
    }
}
</script>