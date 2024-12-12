import { getFirestore, addDoc, collection } from "firebase/firestore";
import app from "../Config";

const db = getFirestore(app);

interface PhotoMetadata {
  latitude: number;
  longitude: number;
  timestamp: string;
  imageUrl: string;
}

export const savePhotoMetadata = async (metadata: PhotoMetadata) => {
  console.log("Saving photo metadata:", metadata);
  try {
    const docRef = await addDoc(collection(db, "photos"), metadata);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
