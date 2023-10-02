import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import FirebaseConfig from "./config/FirebaseConfig";

const firebaseApp = initializeApp(FirebaseConfig);

const auth = getAuth(firebaseApp); // For Authentication
const db = getFirestore(firebaseApp); // For Using Database

export { auth, db };