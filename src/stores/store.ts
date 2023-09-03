import { atom } from "recoil";

export const categoryState = atom({
  key: "categoryState",
  default: "movie",
});

export const searchQueryState = atom({
  key: "searchQuery",
  default: "",
});
