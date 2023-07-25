// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB5U_uC7Yy54CL-5fox0p4mlHxwQnDT5MU",
    authDomain: "capstone-project-f5ce2.firebaseapp.com",
    projectId: "capstone-project-f5ce2",
    storageBucket: "capstone-project-f5ce2.appspot.com",
    messagingSenderId: "371608152368",
    appId: "1:371608152368:web:9d2d2d324786918672c0f5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
