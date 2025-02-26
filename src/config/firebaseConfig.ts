// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { initializeAuth, getReactNativePersistence } from "firebase/auth"
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBMtLsHZjyiunlBpvMpdLzGXDVlG2NYqy8",
  authDomain: "ogsapp-c4b00.firebaseapp.com",
  projectId: "ogsapp-c4b00",
  storageBucket: "ogsapp-c4b00.firebasestorage.app",
  messagingSenderId: "472598237658",
  appId: "1:472598237658:web:f4d7867e300570603ab0e3",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = initializeAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app
