import Navbar from "@/layout/navbar/Navbar";
import Sidebar from "@/layout/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  categoryState,
  favoriteMoviesState,
  favoriteTvShowState,
  userDataState,
} from "./stores/store";
import { firebaseDB } from "./main";
import { getFavoriteMovies, getFavoriteTvShows } from "./firebase/helpers";

function App() {
  const category = useRecoilValue(categoryState);
  const setFavoriteMovies = useSetRecoilState(favoriteMoviesState);
  const setFavoriteTvShows = useSetRecoilState(favoriteTvShowState);
  const [userData, setUserData] = useRecoilState(userDataState);

  const getFavMovies = async () => {
    const user = localStorage.getItem("user");

    if (user) {
      const movies = await getFavoriteMovies(userData.uid, firebaseDB);
      setFavoriteMovies(movies);
    }
  };

  const getFavTvShows = async () => {
    const user = localStorage.getItem("user");

    if (user) {
      const tvShows = await getFavoriteTvShows(userData.uid, firebaseDB);
      setFavoriteTvShows(tvShows);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUserData(JSON.parse(user));
    }
    category === "movie" ? getFavMovies() : getFavTvShows();
  }, []);

  return (
    <section className="flex">
      <Navbar />
      <Outlet />
      <Toaster />
      <Sidebar />
    </section>
  );
}

export default App;
