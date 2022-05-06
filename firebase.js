

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyAyNAWc1l_CcpS2G614zaRndxJ4TnddLWY",
    authDomain: "blogpage-1ec31.firebaseapp.com",
    projectId: "blogpage-1ec31",
    storageBucket: "blogpage-1ec31.appspot.com",
    messagingSenderId: "995736624227",
    appId: "1:995736624227:web:63c7c41396a09b3b7bec56",
    measurementId: "G-EV233NG9N4"
  };


if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}


const auth  = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp

export {auth,db,storage,serverTimestamp}