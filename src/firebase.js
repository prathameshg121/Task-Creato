import firebase from "firebase/app";
import "firebase/auth"

const appfire = firebase.initializeApp({
    apiKey:process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.envREACT_APP_FIREBASE_AUTH_DOMAIN ,
    projectId: process.envREACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.envREACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.envREACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.envREACT_APP_FIREBASE_APP_ID,
    measurementId: process.envREACT_APP_FIREBASE_MESUREMENT_ID
})

export const auth = appfire.auth()
export default appfire;