import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDPvYbTKwVU6MLPVk9sv_x6UwuVxcjX9Lc",
    authDomain: "crudreactemp.firebaseapp.com",
    databaseURL: "https://crudreactemp.firebaseio.com",
    projectId: "crudreactemp",
    storageBucket: "crudreactemp.appspot.com",
    messagingSenderId: "31245142779",
    appId: "1:31245142779:web:980cab8524cdcf489b3e5e",
    measurementId: "G-7SRL830G3M"
  };
  const fb =  firebase.initializeApp(firebaseConfig);
  export const db = fb.firestore();

