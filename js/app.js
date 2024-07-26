import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('Service Worker Registered'))
        .catch((error) => console.warn('Service Worker Not Registered', error));
}

// Check if user is logged in

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

const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        signOut(auth)
            .then(() => {
                console.log('User signed out');
                window.location.href = 'login.html';
            })
            .catch((error) => {
                console.error('Error signing out:', error);
            });
    });
}