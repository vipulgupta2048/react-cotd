import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB3FJkGsAl0QlQNh4PVYpqaeoCkMXsDWzw",
  authDomain: "catch-of-the-day-vipul-2048.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-vipul-2048.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;
