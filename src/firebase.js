import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/storage'
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCf3bmlN4AQBvxshgswHoAfTH86DNV2Zjs",
    authDomain: "social-b2214.firebaseapp.com",
    projectId: "social-b2214",
    storageBucket: "social-b2214.appspot.com",
    messagingSenderId: "690154418815",
    appId: "1:690154418815:web:b76065908aba0b8bc3054a"
  };
  
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth()
  const storage = firebase.storage()
  const db = app.firestore()


export {auth,db,storage}

// import firebase from 'firebase/compat/app';
// import "firebase/compat/firestore";
// import 'firebase/compat/auth';
// import 'firebase/compat/storage';
// const firebaseConfig = {
//     apiKey: "AIzaSyDj-3qE7YcwmK2ByTpAN2oQxLGnGLyi9ng",
//     authDomain: "insta-clone-8d193.firebaseapp.com",
//     projectId: "insta-clone-8d193",
//     storageBucket: "insta-clone-8d193.appspot.com",
//     messagingSenderId: "554195562820",
//     appId: "1:554195562820:web:f4c49f374c4a3b00b6e711"
// };

// const firebaseApp = firebase.initializeApp(firebaseConfig)
// const auth = firebase.auth()
// const storage = firebase.storage()
// const db = firebaseApp.firestore()
// export { auth, db, storage }
