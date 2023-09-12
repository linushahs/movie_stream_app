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
  name: string | null;
  email: string | null;
  photoURL: string;
};

export const userDataState = atom({
  key: "userData",
  default: <UserProps>{
    name: "",
    email: "",
    photoURL: "",
  },
});

export const favoriteMoviesState = atom({
  key: "favoriteMovies",
  default: [],
});
