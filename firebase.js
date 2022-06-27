

import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyACpI3AAIyUNu0A-SaVw_geYpadPidyTXw",
    authDomain: "insta-clone-715f4.firebaseapp.com",
    projectId: "insta-clone-715f4",
    storageBucket: "insta-clone-715f4.appspot.com",
    messagingSenderId: "989185564132",
    appId: "1:989185564132:web:20e7f27c21a89305c97bf1"
  };
  !firebase.apps.length? firebase.initializeApp(firebaseConfig)  : firebase.app() 
  
  export default firebase
  