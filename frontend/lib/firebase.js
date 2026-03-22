// Import the functions from the SDKs
import { initializeApp } from "firebase/app";

// Firebase web app's configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsPPcBfv2REFrz5V2plUK_2a6KmUrRnns",
  authDomain: "taploom-shopping-cart.firebaseapp.com",
  projectId: "taploom-shopping-cart",
  storageBucket: "taploom-shopping-cart.firebasestorage.app",
  messagingSenderId: "308703636953",
  appId: "1:308703636953:web:4cd3af7bbc53b2efa33dc8"
};

const app = initializeApp(firebaseConfig);

export default app;
