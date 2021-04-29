import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyCLKVbtMO9VEM3QdsZfnN7pNdi0IBaBFKM",
    authDomain: "jobify-1cb8c.firebaseapp.com",
    projectId: "jobify-1cb8c",
    storageBucket: "jobify-1cb8c.appspot.com",
    messagingSenderId: "460180388950",
    appId: "1:460180388950:web:f7e6de361b0cb577258ff7"
  };



firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const db = firebase.firestore();