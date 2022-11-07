import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCJBtmRlgE3dJPjaD1aEqT868HYnTUxMk8",
    authDomain: "react-book-a92a8.firebaseapp.com",
    projectId: "react-book-a92a8",
    storageBucket: "react-book-a92a8.appspot.com",
    messagingSenderId: "1044433581637",
    appId: "1:1044433581637:web:a0e295ead36c3858d6952c"
  };

  const firebaseDB = firebase.initializeApp(firebaseConfig);

  const db = firebaseDB.database().ref();
  const auth = firebase.auth();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
  
  export { auth, googleAuthProvider, facebookAuthProvider, db };