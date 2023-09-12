import { Firestore, collection, getDocs } from "firebase/firestore";

export const getFavoriteMovies = async (uid: string, db: Firestore) => {
  // Query the Firestore collection
  const list: any = [];
  const querySnapshot = await getDocs(
    collection(db, uid, "favorites", "movies")
  );
  querySnapshot.forEach((doc) => {
    list.push(doc.data());
  });

  return list;
};
