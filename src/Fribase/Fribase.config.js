// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4j1J9qGgUdU4sBCPCcfEfAEZTW3KvRAk",
  authDomain: "user-email-password-auth-7-24.firebaseapp.com",
  projectId: "user-email-password-auth-7-24",
  storageBucket: "user-email-password-auth-7-24.appspot.com",
  messagingSenderId: "166155188676",
  appId: "1:166155188676:web:bd585b6fb27bd6c0468c91"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;