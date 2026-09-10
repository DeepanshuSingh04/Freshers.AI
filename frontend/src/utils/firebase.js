
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "demointerview-d8b68.firebaseapp.com",
  projectId: "demointerview-d8b68",
  storageBucket: "demointerview-d8b68.firebasestorage.app",
  messagingSenderId: "323796429237",
  appId: "1:323796429237:web:753fd4999175c741f691fc"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth , provider}