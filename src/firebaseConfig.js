// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCofsss37zgpjtSerTdEPx32NKardBQX6g",
  authDomain: "rirs10.firebaseapp.com",
  projectId: "rirs10",
  storageBucket: "rirs10.appspot.com",
  messagingSenderId: "18082226855",
  appId: "1:18082226855:web:e6d506e19185b234323182",
  measurementId: "G-9YCR1JYMTT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;

