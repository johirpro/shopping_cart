// Import the functions from the SDKs
import { initializeApp } from "firebase/app";

// Firebase web app's configuration
const firebaseConfig = {
  apiKey: "<FIREBASE_PROJECT_API_KEY>",
  authDomain: "<FIREBASE_PROJECT_AUTH_DOMAIN>",
  projectId: "<FIREBASE_PROJECT_ID>",
  storageBucket: "<FIREBASE_PROJECT_STORAGE_BUCKET>",
  messagingSenderId: "<FIREBASE_PROJECT_MESSAGING_SENDER_ID>",
  appId: "<FIREBASE_PROJECT_APP_ID>"
};

const app = initializeApp(firebaseConfig);

export default app;
