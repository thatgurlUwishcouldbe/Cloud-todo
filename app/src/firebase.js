import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-Zom80CZHFuWxNJkj9vRtSRswOaCPwew",
  authDomain: "cloudtodoapp-6a0ac.firebaseapp.com",
  databaseURL: "https://cloudtodoapp-6a0ac-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cloudtodoapp-6a0ac",
  storageBucket: "cloudtodoapp-6a0ac.firebasestorage.app",
  messagingSenderId: "537472567686",
  appId: "1:537472567686:web:c2b2f993d78cf3cf444407",
  measurementId: "G-SMNWP1WHNX",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
