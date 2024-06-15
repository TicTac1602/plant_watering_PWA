// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, onSnapshot, addDoc, doc, getDoc, setDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
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
const storage = getStorage(app);

// realtime listener
const plantsCollection = collection(db, 'plants');
onSnapshot(plantsCollection, snapshot => {
    snapshot.docChanges().forEach(change => {
        if(change.type === 'added') {
            renderPlant(change.doc.data(), change.doc.id);
            applyBackgroundColors(change.doc.data(), change.doc.id);
        }
        if(change.type === 'removed') {
            removePlant(change.doc.id);
        }
    });
});

// add new plant
const form = document.querySelector('.add-plant');
form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    let plant = {
        name: form.name.value,
        description: form.description.value,
        grow_speed: form.grow_speed.value,
        watering_span: parseInt(form.watering_span.value),
        last_watered: new Date().getTime(),
    };
    
    const imageFile = form['plant-image'].files[0];
    
    // form validation
    if(plant.name === '' || !plant.watering_span || plant.watering_span < 0) {
        alert('Please fill all fields');
        return;
    }

    try{
        if(imageFile === undefined) {
            plant.imageUrl = "";
            addDoc(plantsCollection, plant)
                .catch(err => console.log(err));
            return;
        }
        const imageBlob = await getBlobFromImage(imageFile);
        const storageRef  = ref(storage, `plants/${plant.name}`);
        const snapshot = await uploadBytes(storageRef, imageBlob);
        const imageUrl = await getDownloadURL(snapshot.ref);
        plant.imageUrl = imageUrl;

        addDoc(plantsCollection, plant)
            .catch(err => console.log(err));
    } catch(err) {
        console.error(err);
    }
    form.reset();
    M.updateTextFields();
    
    function getBlobFromImage(imageFile) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
            const blob = new Blob([reader.result], { type: imageFile.type });
            resolve(blob);
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(imageFile);
        });
    }
});

// delete plant
const plants = document.querySelector('.plants');
plants.addEventListener('click', async (evt) => {
    if(evt.target.tagName === 'I') {
        const id = evt.target.getAttribute('data-id');
        // get the plant document
        const plantDoc = await getDoc(doc(db, 'plants', id));
        const plantData = plantDoc.data();
        deleteDoc(doc(db, 'plants', id));
        // delete the image from storage
        console.log(plantData.imageUrl);
        if (plantData.imageUrl === "") return;
        const storageRef = ref(storage, `plants/${plantData.name}`);
        deleteObject(storageRef)
            .catch(err => console.error(err));
    } else if (evt.target.tagName === 'DIV' && !evt.target.classList.contains('plants')) {
        console.log("open plant details");
    }
});