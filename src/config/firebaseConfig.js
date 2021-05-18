import firebase from 'firebase/app';
import 'firebase/firestore';

// Web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyAaHvbtLAjac-CysIyY3KEU0seHoRhnSGo',
  authDomain: 'react-book-list-369d2.firebaseapp.com',
  projectId: 'react-book-list-369d2',
  storageBucket: 'react-book-list-369d2.appspot.com',
  messagingSenderId: '957274692264',
  appId: '1:957274692264:web:8cc7b8b34fee082763409d'
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
// the database for all requests
const db = firebase.firestore();

export default db;