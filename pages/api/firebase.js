
import { 
    initializeApp,
    getApps,
    getApp
} from "firebase/app";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth"

import {
    getFirestore,
    setDoc,
    doc,
    getDoc,
} from "firebase/firestore"

import {
    getDatabase,
} from "firebase/database"
import { 
    AES, 
    enc } from "crypto-js";


const firebaseConfig = {
  apiKey: `${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
  authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}`,
  projectId: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`,
  storageBucket: `${process.env.FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${process.env.FIREBASE_APP_ID}`,
  databaseURL: `${process.env.NEXT_PUBLIC_FIREBASE_DB_URL}`
};

// Initialize Firebase
const APP = getApps().length ? getApp() : initializeApp(firebaseConfig)
const AUTH = getAuth(APP)
const DB = getDatabase()
const FIRESTORE = getFirestore(APP)


function addNewUser(username, email, password) {

    let encPassword = AES.encrypt(password, "process.env").toString();

    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(AUTH, email, password)
        .then( async () => {
            let specialID = (Math.random() + 1).toString(36).substring(4)

            await setDoc(doc(FIRESTORE, "users", `${specialID}`), {
                username: username,
                email: email,
                password: encPassword,
                loginID: `${specialID}`
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

function loginUser(specialID) {

    const docRef = doc(FIRESTORE, "users", `${specialID}`);

    return new Promise(async (resolve, reject) => {

        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
            let passwordGot = AES.decrypt(docSnap.data().password, "process.env").toString(enc.Utf8)
            signInWithEmailAndPassword(AUTH, docSnap.data().email, passwordGot)
            .then((e) => {
                resolve(docSnap.data())
            })
        }
        else reject("No user Found")

    })

}

export { addNewUser, loginUser }