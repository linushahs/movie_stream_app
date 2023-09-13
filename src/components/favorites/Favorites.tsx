import { getFavoriteMovies, getFavoriteTvShows } from "@/firebase/helpers";
import FavoritesHeader from "@/layout/FavoritesHeader";
import Navbar from "@/layout/navbar/Navbar";
import Sidebar from "@/layout/sidebar/Sidebar";
import { firebaseApp } from "@/main";
import { categoryState, favoriteMoviesState } from "@/stores/store";
import { getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { useRecoilState, useRecoilValue } from "recoil";
import Movie from "../Movie";
import { Toaster } from "../ui/toaster";
import { useMatches } from "react-router-dom";

function Favorites() {
  const [favoriteMovies, setFavoriteMovies] =
    useRecoilState(favoriteMoviesState);
  const category = useRecoilValue(categoryState);
  const [{ pathname }] = useMatches();

  const db = getFirestore(firebaseApp);

  const getFavMovies = async (uid: string) => {
    const movies = await getFavoriteMovies(uid, db);
    setFavoriteMovies(movies);
  };

  const getFavTvShows = async (uid: string) => {
    const movies = await getFavoriteTvShows(uid, db);
    setFavoriteMovies(movies);
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedData = JSON.parse(userData);

      pathname === "/favorites/movies"
        ? getFavMovies(parsedData.uid)
        : getFavTvShows(parsedData.uid);
    }
  }, [pathname]);

  return (
    <section className="App flex">
      <Navbar />

      <div className="main-container">
        <div className="flex justify-between ">
          <FavoritesHeader />

          <div className="flex justify-end gap-2 text-white">
            <button
              // onClick={goToPrevTrailer}
              className="border border-gray-dark p-2 rounded-full hover:bg-dark"
            >
              <HiOutlineChevronLeft className="text-xl" />
            </button>
            <button
              // onClick={goToNextTrailer}
              className="border border-gray-dark p-2 rounded-full hover:bg-dark"
            >
              <HiOutlineChevronRight className="text-xl" />
            </button>
          </div>
        </div>

        <div className="movie-container mt-6">
          {favoriteMovies.map((movie: any) => (
            <Movie
              key={movie.id}
              id={movie.id}
              poster_path={movie.poster_path}
              title={movie.title || movie.name}
              rating={movie.vote_average?.toFixed(1)}
              release_date={movie.release_date}
            />
          ))}
        </div>
      </div>

      <Sidebar />
      <Toaster />
    </section>
  );
}

export default Favorites;
