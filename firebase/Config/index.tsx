import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCvUi5qDh3o0gH537j499yexXav02sSoc4",
    authDomain: "week11cross-ad6b1.firebaseapp.com",
    projectId: "week11cross-ad6b1",
    storageBucket: "week11cross-ad6b1.firebasestorage.app",
    messagingSenderId: "178979873546",
    appId: "1:178979873546:web:cf1a3f1f0ab6309bf290f3",
    measurementId: "G-V41H3Q0GW7"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export {db, storage };
export default app;