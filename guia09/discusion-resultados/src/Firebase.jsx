import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig={
    apiKey: "AIzaSyBseKfExcLjp4iM5c1zUaIRFHZka56n40c",
    authDomain: "crudreactfirebase-e066d.firebaseapp.com",
    databaseURL: "https://crudreactfirebase-e066d.firebaseio.com",
    projectId: "crudreactfirebase-e066d",
    storageBucket: "crudreactfirebase-e066d.appspot.com",
    messagingSenderId: "351350702802",
    appId: "1:351350702802:web:56f2cf48cd24fde54f630b",
    measurementId: "G-C807T9RCY1"
};

const fb =  firebase.initializeApp(firebaseConfig);
export const db = fb.firestore();