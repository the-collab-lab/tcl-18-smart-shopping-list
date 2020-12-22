// NOTE: import only the Firebase modules that you need in your app... except
// for the second line, which makes both the linter and react-firebase happy
import firebase from 'firebase/app';
import 'firebase/firestore';

// Initalize Firebase.
// These details will need to be replaced with the project specific env vars at the start of each new cohort.
var firebaseConfig = {
  apiKey: "AIzaSyCUAyVKewVI4hp_1WjTka8iKzWQb1tY-ec",
  authDomain: "tcl-18-shopping-list.firebaseapp.com",
  projectId: "tcl-18-shopping-list",
  storageBucket: "tcl-18-shopping-list.appspot.com",
  messagingSenderId: "1010208318256",
  appId: "1:1010208318256:web:ed4b58b8867ec6d141def5"
};

let fb = firebase.initializeApp(firebaseConfig);

export { fb };
