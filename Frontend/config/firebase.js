// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAejDoTWtV1KBgyfcTRKT3oaZyOHT_mz38",
  authDomain: "aspirasi-web.firebaseapp.com",
  projectId: "aspirasi-web",
  storageBucket: "aspirasi-web.appspot.com",
  messagingSenderId: "194922906382",
  appId: "1:194922906382:web:a13939dbb04af5d98c4d5f",
  measurementId: "G-WZBQXEGVM0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);