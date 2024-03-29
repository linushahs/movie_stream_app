import { atom } from "recoil";

export const categoryState = atom({
  key: "categoryState",
  default: "movie",
});

export const searchQueryState = atom({
  key: "searchQuery",
  default: "",
});

export type UserProps = {
  uid: string;
  name: string | null;
  email: string | null;
  photoURL: string;
};

export const userDataState = atom({
  key: "userData",
  default: JSON.parse(localStorage.getItem("user") as string) || {
    uid: "",
    name: "",
    email: "",
    photoURL: ""
  },
});

export const favoriteShowsState = atom({
  key: "favoriteShows",
  default: [],
});

export const isWatchOpenState = atom({
  key: "isWatchOpen",
  default: false,
});
