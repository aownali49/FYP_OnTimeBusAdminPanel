// Import the functions you need from the SDKs you need
import * as firebase from 'firebase/';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJILB04WyYzb623gDwXBYKTOL-9wzp5Mc",
  authDomain: "quickbus-59753.firebaseapp.com",
  databaseURL: "https://quickbus-59753-default-rtdb.firebaseio.com",
  projectId: "quickbus-59753",
  storageBucket: "quickbus-59753.appspot.com",
  messagingSenderId: "145342325889",
  appId: "1:145342325889:web:2183e54787bd3226289980",
  measurementId: "G-24FM9M0X23"
};

// Initialize Firebase
let app;

if (firebase.default.apps.length === 0) {
  app = firebase.default.initializeApp(firebaseConfig);
} else {
  app = firebase.default.app()
}

const auth = firebase.default.auth()
const db = firebase.default.firestore()
const realdb = firebase.default.database();

export { auth, db,realdb };