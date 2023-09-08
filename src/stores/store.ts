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
  profile_path: string | null;
};

export const loggedInUserState = atom({
  key: "loggedInUser",
  default: <UserProps>{
    name: "",
    email: null,
    profile_path: null,
  },
});
