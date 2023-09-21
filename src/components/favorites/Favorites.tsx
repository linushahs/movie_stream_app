import { getFavoriteMovies, getFavoriteTvShows } from "@/firebase/helpers";
import FavoritesHeader from "@/layout/RouteHeader";
import Navbar from "@/layout/navbar/Navbar";
import Sidebar from "@/layout/sidebar/Sidebar";
import { firebaseApp } from "@/main";
import { categoryState, favoriteMoviesState } from "@/stores/store";
import { getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useMatches } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import Movie from "../Movie";
import { Toaster } from "../ui/toaster";
import Pagination from "../Pagination";

function Favorites() {
  const [favoriteMovies, setFavoriteMovies] =
    useRecoilState(favoriteMoviesState);
  const category = useRecoilValue(categoryState);
  const [pagination, setPagination] = useState({
    startIndex: 0,
    endIndex: 10,
  });

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

      category === "movie"
        ? getFavMovies(parsedData.uid)
        : getFavTvShows(parsedData.uid);
    }
  }, [category]);

  return (
    <section className="App flex">
      <Navbar />

      <div className="main-container">
        <div className="flex justify-between ">
          <FavoritesHeader />

          <Pagination
            totalItems={favoriteMovies.length}
            setPagination={setPagination}
          />
        </div>

        <div className="movie-container mt-6">
          {favoriteMovies.map((movie: any, idx: number) => {
            if (idx >= pagination.startIndex && idx < pagination.endIndex) {
              return (
                <Movie
                  key={movie.id}
                  id={movie.id}
                  poster_path={movie.poster_path}
                  title={movie.title || movie.name}
                  rating={movie.rating}
                  release_date={movie.release_date}
                />
              );
            }
          })}
        </div>
      </div>

      <Sidebar />
      <Toaster />
    </section>
  );
}

export default Favorites;
