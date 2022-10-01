import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "twitter-clone-nextjs-f3570.firebaseapp.com",
  projectId: "twitter-clone-nextjs-f3570",
  storageBucket: "twitter-clone-nextjs-f3570.appspot.com",
  messagingSenderId: "347311618795",
  appId: "1:347311618795:web:b68956f6dde0454c705cae",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { db, storage, app as default };
