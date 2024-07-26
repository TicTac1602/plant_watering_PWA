import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyD8Hsrrs52al549DwKsIQ369MXhUOq4b4s",
    authDomain: "waterme-pwa.firebaseapp.com",
    projectId: "waterme-pwa",
    storageBucket: "waterme-pwa.appspot.com",
    messagingSenderId: "249794663490",
    appId: "1:249794663490:web:cef1ae132752a7a4f889db",
    measurementId: "G-BWM788ZR6F"
};  
    
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById('show-signup').addEventListener('click', function() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'flex';
});

document.getElementById('show-login').addEventListener('click', function() {
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'flex';
});

document.getElementById('login-form').addEventListener('submit', function(evt) {
    evt.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('User is signed in:', user);
            window.location.href = 'index.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorMessage);
        });
});

document.getElementById('signup-form').addEventListener('submit', function(evt) {
    evt.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('User is signed in:', user);
            window.location.href = 'index.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorMessage);
        });
});