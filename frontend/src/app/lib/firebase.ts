import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDRMWTcUm66swu71I1roMZeq6qwi8hB_OY",
  authDomain: "teamc-auth.firebaseapp.com",
  projectId: "teamc-auth",
  storageBucket: "teamc-auth.firebasestorage.app",
  messagingSenderId: "759579331317",
  appId: "1:759579331317:web:3f4bf76715b294c26693bc",
  measurementId: "G-4TXNV3TEN5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
