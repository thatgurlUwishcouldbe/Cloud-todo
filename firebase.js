import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB2fuFQGBalhD15wRgiVaFtqva7gw1LSCk",
    authDomain: "cloud-todo-12efd.firebaseapp.com",
    projectId: "cloud-todo-12efd",
    storageBucket: "cloud-todo-12efd.firebasestorage.app",
    messagingSenderId: "877570350880",
    appId: "1:877570350880:web:19e068f5e34b8e0bf4c145",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);