// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5VZEEY4D8Ny7XwUStj9UWV_07vMeU_rU",
  authDomain: "gpt-netflix-six.firebaseapp.com",
  projectId: "gpt-netflix-six",
  storageBucket: "gpt-netflix-six.appspot.com",
  messagingSenderId: "86278261210",
  appId: "1:86278261210:web:f5413755e0b4ef51f4d8e3",
  measurementId: "G-LG576M9ZH7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
