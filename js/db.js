// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, onSnapshot, enableIndexedDbPersistence, addDoc, getDocs, doc, setDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
  
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const db = getFirestore(app);

// offline data
enableIndexedDbPersistence(db)
    .catch(err => {
        if(err.code == 'failed-precondition') {
            console.log('multiple tabs open');
        } else if(err.code == 'unimplemented') {
            console.log('browser not support');
        }
    });

// realtime listener
const plantsCollection = collection(db, 'plants');
onSnapshot(plantsCollection, snapshot => {
    snapshot.docChanges().forEach(change => {
        if(change.type === 'added') {
            renderPlant(change.doc.data(), change.doc.id);
        }
        if(change.type === 'removed') {
            removePlant(change.doc.id);
        }
    });
});

// add new plant
const form = document.querySelector('.add-plant');
form.addEventListener('submit', evt => {
    evt.preventDefault();
    const plant = {
        name: form.name.value,
        description: form.description.value
    };
    addDoc(plantsCollection, plant)
        .catch(err => console.log(err));
    form.name.value = '';
    form.description.value = '';
});

// delete plant
const plants = document.querySelector('.plants');
plants.addEventListener('click', evt => {
    console.log(evt.target);
    if(evt.target.tagName === 'I') {
        const id = evt.target.getAttribute('data-id');
        deleteDoc(doc(db, 'plants', id));
    } else if (evt.target.tagName === 'DIV' && !evt.target.classList.contains('plants')) {
        console.log("open plant details");
    }
});