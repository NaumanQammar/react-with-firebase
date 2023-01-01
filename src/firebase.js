 // Import the functions you need from the SDKs you need
 import { initializeApp } from "firebase/app";
 import { getFirestore } from "firebase/firestore";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries
 // Your web app's Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyBQbr-KHNcfhvGmR0OBuR3A0RM-rwJWMEY",
    authDomain: "reactform-95b0c.firebaseapp.com",
    databaseURL: "https://reactform-95b0c-default-rtdb.firebaseio.com",
    projectId: "reactform-95b0c",
    storageBucket: "reactform-95b0c.appspot.com",
    messagingSenderId: "718274479044",
    appId: "1:718274479044:web:b83c707dfe817aeb26da91"
  };
 // Initialize Firebase
 
 const app = initializeApp(firebaseConfig);
 // Export firestore database
 // It will be imported into your react app whenever it is needed
 export const db = getFirestore(app);