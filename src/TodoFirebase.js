import firebase from "firebase/app";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDHf0aSyrfu8FF1AjohUp4jIjVudKMXuG0",
  authDomain: "react-todo-app-f8efc.firebaseapp.com",
  projectId: "react-todo-app-f8efc",
  storageBucket: "react-todo-app-f8efc.appspot.com",
  messagingSenderId: "226704335882",
  appId: "1:226704335882:web:829b0f1561d7602cca2bf3",
  measurementId: "G-32VV188381",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };
