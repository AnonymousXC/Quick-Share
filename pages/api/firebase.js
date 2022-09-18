
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

    const uploadProgressLabel = document.getElementById("uploadProgressLabel")
    uploadProgressLabel.innerText = "0%"

    return new Promise((resolve, reject) => {
        const storageRef = ref(STORAGE, localStorage.getItem("userID") + "/" + file.name + "-" + localStorage.getItem("userID"))
        const uploader = uploadBytesResumable(storageRef, file)

        uploader.on("state_changed", (snapshot) => {
            let percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            uploadProgressLabel.innerText = percent + "%"
        })

        uploader.then((e) => {
            resolve("Uploaded Successfully")
        })
        .catch((err) => {
            reject(err)
        })
    })
}

async function readTextData() {
    let html = ``
    const userID = localStorage.getItem("userID")
    let data = await getDocs(collection(FIRESTORE, `users/${userID}/data`))
    data.forEach((snapshot) => {
        if(!snapshot.exists()) return;
        html += `
        <div style="
                background: var(--chakra-colors-gray-700);
                color: #fff !important;
                margin: 6px;
                padding: 6px;
                border-radius: 8px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                height: 60%;
                max-height: 100%;
                overflow-y: auto;
            ">${snapshot.data().text} <br>
            <div>
                <button class="copy-btn" style="
                    position: relative;
                    bottom: 0px;
                    width: 100%;
                    background: var(--chakra-colors-whiteAlpha-400);
                    border-radius: 8px;    
                " >Copy</button> 
                <button style="
                    position: relative;
                    bottom: 0px;
                    width: 100%;
                    margin-top: 6px;
                    background: var(--chakra-colors-whiteAlpha-400);
                    border-radius: 8px;    
                " >Share</button>
            </div>
        </div>
        `
    })
    return html
}


export { 
    addNewUser, 
    loginUser, 
    logoutUser, 
    uploadText, 
    uploadFile, 
    readTextData 
}