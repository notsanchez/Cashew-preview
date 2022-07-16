import {getApp, getApps, initializeApp}  from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDzmvav2WVvg5eHuO9v3vb_XimLG3_W8do",
    authDomain: "cashew-becfd.firebaseapp.com",
    databaseURL: "https://cashew-becfd-default-rtdb.firebaseio.com",
    projectId: "cashew-becfd",
    storageBucket: "cashew-becfd.appspot.com",
    messagingSenderId: "917630915857",
    appId: "1:917630915857:web:522daf343872b73dbd28b0"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app)
const storage = getStorage(app)

export { app, firestore, storage };