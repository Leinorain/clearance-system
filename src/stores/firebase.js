import { defineStore } from 'pinia'
import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDcjwlWtio9ukBeEinJ3yz25eGbcuqeK6w",
    authDomain: "clearance-and-attendance.firebaseapp.com",
    databaseURL: "https://clearance-and-attendance-default-rtdb.firebaseio.com",
    projectId: "clearance-and-attendance",
    storageBucket: "clearance-and-attendance.appspot.com",
    messagingSenderId: "1022527437793",
    appId: "1:1022527437793:web:ecd960faeac964d8b230a0",
    measurementId: "G-XHXL52149R"
};

export const useFirebaseStore = defineStore('firebase', {
    state: () => ({ app: null, auth: null, firestore: null }),
    actions: {
        getApp() {
            if(!this.app) {
                this.app = initializeApp(firebaseConfig)
            }
            return this.app
        },
        getAuth() {
            if(!this.auth) {
                this.auth = getAuth(this.getApp())
                if(import.meta.env.DEV) {
                    connectAuthEmulator(this.auth, 'http://localhost:9099')
                }
            }
            return this.auth
        },
        getFirestore() {
            if(!this.firestore) {
                this.firestore = getFirestore(this.getApp())
                if(import.meta.env.DEV) {
                    connectFirestoreEmulator(this.firestore, 'localhost', 8080)
                }
            }
            return this.firestore
        }
    }
})