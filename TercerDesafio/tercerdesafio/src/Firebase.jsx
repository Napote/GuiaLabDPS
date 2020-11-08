import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBaeOWoByrvEM485RGJ60OIE-g0fW31FZs",
    authDomain: "tercerdesafio.firebaseapp.com",
    databaseURL: "https://tercerdesafio.firebaseio.com",
    projectId: "tercerdesafio",
    storageBucket: "tercerdesafio.appspot.com",
    messagingSenderId: "32160296469",
    appId: "1:32160296469:web:80790017bd5d870e20e81c",
    measurementId: "G-H4EV0DGMJS"
  };

  const fb =  firebase.initializeApp(firebaseConfig);
  export const db = fb.firestore();
