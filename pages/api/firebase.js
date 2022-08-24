
import { 
    initializeApp,
    getApps,
    getApp
} from "firebase/app";

import {
    getAuth,
    createUserWithEmailAndPassword,
} from "firebase/auth"

import {
    getFirestore,
    collection,
    setDoc,
    doc,
} from "firebase/firestore"

import {
    getDatabase,
    ref,
    set
} from "firebase/database"


const firebaseConfig = {
  apiKey: `${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
  authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}`,
  projectId: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`,
  storageBucket: `${process.env.FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${process.env.FIREBASE_APP_I}`,
  databaseURL: `${process.env.NEXT_PUBLIC_FIREBASE_DB_URL}`
};

// Initialize Firebase
const APP = getApps().length ? getApp() : initializeApp(firebaseConfig)
const AUTH = getAuth(APP)
const DB = getDatabase()
const FIRESTORE = getFirestore(APP)


function addNewUser(username, email, password) {

    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(AUTH, email, password)
        .then( async () => {
            let specialID = (Math.random() + 1).toString(36).substring(4)

            await setDoc(doc(FIRESTORE, "users", specialID), {
                username: username,
                email: email,
                password: password,
                loginID: specialID
            })
            .then((e) => {})
            .catch((err) => {})

            resolve(["Account Made Successfully.", specialID])
        })
        .catch((error) => {
            reject(error.message)
        }) 
    })
}

export { addNewUser }