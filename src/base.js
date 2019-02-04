import firebase from "firebase/app";

const firebaseApp = firebase.initializeApp({
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
});

export const auth = firebaseApp.auth();

// This is a named export
export { firebaseApp };
