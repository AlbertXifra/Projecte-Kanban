// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js'; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export class Database{

    firebaseApp;
    db;
      
    constructor() { 
        this.firebaseApp = initializeApp({
            apiKey: "AIzaSyBrvXluKvIT9bjwpaYFr6Eb3IKEaIjZ6gc",
            authDomain: "kanban-b93e3.firebaseapp.com",
            projectId: "kanban-b93e3"
            // storageBucket: "kanban-b93e3.appspot.com",
            // messagingSenderId: "1041781128026",
            // appId: "1:1041781128026:web:b8e3770fa9f796b7ca1163",
            // measurementId: "G-J9229RCH0D"
        });

        // Initialize Firebase
        // const app = initializeApp(firebaseConfig); const firebaseConfig
        this.db = getFirestore();
  
    }   

    //Afegir tasca amb FireBase
    async afegirTasca(codi, descripcio, dataInici, dataFinal, nom, tria, estat) {
            console.log(codi, descripcio, dataInici, dataFinal, nom, tria, estat);

        try {
            const docRef = await addDoc(collection(this.db, "tasca"), {
                codi,
                descripcio,
                dataInici,
                dataFinal,
                nom,
                tria,
                estat
            });
            console.log("Document written with ID: ", docRef.codi);
            } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    async recuperarTasca() {
        const recuperar = await getDocs(collection(this.db, 'tasca'));
        return recuperar;
    }

    async eliminarTasca() {
        const eliminar = await deleteDoc(collection(this.db, 'tasca'));
        return eliminar;
    }
}