import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from "../Config";

const storage = getStorage(app);

export const uploadImage = async (uri: string, fileName: string) => {
  console.log("Memulai fungsi uploadImage");
  const response = await fetch(uri);
  console.log("Mengambil respons dari URI");
  const blob = await response.blob();
  console.log("Mengonversi respons menjadi blob");
  const storageRef = ref(storage, `images/${fileName}`);
  console.log(`Membuat penyimpanan: images/${fileName}`);
  await uploadBytes(storageRef, blob);
  console.log("Upload penyimpanan");
  const downloadURL = await getDownloadURL(storageRef);
  console.log(`Mengambil url: ${downloadURL}`);
  return downloadURL;
};
