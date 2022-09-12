
import { 
    initializeApp,
    getApps,
    getApp,
} from "firebase/app";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth"

import {
    getFirestore,
    setDoc,
    doc,
    collection,
    query,
    where,
    getDocs,
    addDoc,
} from "firebase/firestore"

import {
    getStorage, 
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage"

import { 
    AES
} from "crypto-js";


const firebaseConfig = {
  apiKey: `${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
  authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}`,
  projectId: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`,
  storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${process.env.FIREBASE_APP_ID}`,
  databaseURL: `${process.env.NEXT_PUBLIC_FIREBASE_DB_URL}`
};

// Initialize Firebase
const APP = getApps().length ? getApp() : initializeApp(firebaseConfig)
const AUTH = getAuth(APP)
const STORAGE = getStorage()
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

function loginUser(email, password) {

    let FBQUERY = query(collection(FIRESTORE, "users"), where("email", "==", email))

    return new Promise(async (resolve, reject) => {
        signInWithEmailAndPassword(AUTH, email, password)
        .then((e) => {
            getDocs(FBQUERY)
            .then((userData) => {
                let data = userData.docs[0].data()
                delete data.password
                resolve(data)
            })
            .catch((err) => {
                reject(err)
            })
        })
        .catch((err) => {
            reject(err)
        })
    })

}

function logoutUser() {
    signOut(AUTH)
    .then((e) => {
        console.log("Successfully Signed Out");
        localStorage.removeItem("email")
        localStorage.removeItem("userID")
        localStorage.removeItem("username")
    })
    .catch((err) => {
        console.log(err);
    })
}

function uploadText(text) {

    return new Promise((resolve, reject) => {
        let coll = collection(FIRESTORE, "users", localStorage.getItem("userID"), "data")
        addDoc(coll, {
            text : text
        })
        .then((e) => {
            resolve("Successfully Added")
        })
        .catch((err) => {
            reject(err)
        })
    })
}

function uploadFile(file) {

    return new Promise((resolve, reject) => {
        const storageRef = ref(STORAGE, file.name + "-" + localStorage.getItem("userID"))
        const uploader = uploadBytesResumable(storageRef, file)
        uploader.then((e) => {
            const downURL = getDownloadURL(ref(STORAGE, file.name + localStorage.getItem("userID")))
            downURL.then((url) => {
                uploadText(url)
                .then(() => {
                    resolve("Uploaded Successfully")
                })
                .catch((err) => {
                    reject(err)
                })
            })
            .catch((err) => {
                reject(err)
            })
        })
        .catch((err) => {
            reject(err)
        })
    })
}

export { addNewUser, loginUser, logoutUser, uploadText, uploadFile }