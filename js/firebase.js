// firebase.js

import { initializeApp } from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { 
    getAuth 
} from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    getFirestore
} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyAfhIdYarm3A9vHc6qLfowQhp_hLpN3Oqw",
  authDomain: "gilsa-dental-lab.firebaseapp.com",
  projectId: "gilsa-dental-lab",
  storageBucket: "gilsa-dental-lab.firebasestorage.app",
  messagingSenderId: "542281516978",
  appId: "1:542281516978:web:fb7a084db173c45ecd06ab",
  measurementId: "G-G55R8ND9EX"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);

export const db = getFirestore(app);
