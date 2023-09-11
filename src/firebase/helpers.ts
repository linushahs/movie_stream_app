import { firebaseApp } from "@/main";
import {
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";

export const getFavoriteMovies = async (db: Firestore) => {
  // Query the Firestore collection
  const list: any = [];
  const querySnapshot = await getDocs(collection(db, "favorite(movies)"));
  querySnapshot.forEach((doc) => {
    list.push(doc.data());
  });

  return list;
};
