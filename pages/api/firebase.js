
import { 
    initializeApp,
    getApps,
    getApp
} from "firebase/app";

import {
    getAuth,
    createUserWithEmailAndPassword,
} from "firebase/auth"



const firebaseConfig = {
  apiKey: `${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
  authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}`,
  projectId: `${process.env.FIREBASE_PROJECT_ID}`,
  storageBucket: `${process.env.FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${process.env.FIREBASE_APP_I}`
};

// Initialize Firebase
const APP = initializeApp(firebaseConfig)
const AUTH = getAuth(APP)


function addNewUser(username, email, password) {
    let specialID = (Math.random() + 1).toString(36).substring(4)

    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(AUTH, email, password)
        .then(() => {
            resolve("Account Made Successfully.")
        })
        .catch((error) => {
            reject(error)
        }) 
    })
}

export { addNewUser }