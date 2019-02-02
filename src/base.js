import firebase from "firebase/app";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB3FJkGsAl0QlQNh4PVYpqaeoCkMXsDWzw",
  authDomain: "catch-of-the-day-vipul-2048.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-vipul-2048.firebaseio.com",
  projectId: "catch-of-the-day-vipul-2048",
  storageBucket: "catch-of-the-day-vipul-2048.appspot.com",
  messagingSenderId: "133696293648"
});

export const auth = firebaseApp.auth();

// This is a named export
export { firebaseApp };
