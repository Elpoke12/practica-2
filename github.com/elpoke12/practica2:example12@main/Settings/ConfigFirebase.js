import firebase from 'firebase/app';
import 'firebase/database';

const config={

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  
    apiKey: "AIzaSyAUr6Kjtur2H6ihONwSFAMi1gUWuyWqM4g",
    authDomain: "nuevo-peli.firebaseapp.com",
    databaseURL: "https://nuevo-peli-default-rtdb.firebaseio.com",
    projectId: "nuevo-peli",
    storageBucket: "nuevo-peli.appspot.com",
    messagingSenderId: "121116914467",
    appId: "1:121116914467:web:e10801d359feca3dda5296",
    measurementId: "G-D9PTYK4F0P"
  };
  // Initialize Firebase
  
  

const fb = !firebase.apps.lenght ? firebase.initializeApp(config):firebase.app()

export default fb; 