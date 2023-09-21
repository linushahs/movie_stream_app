import { getFavoriteMovies, getFavoriteTvShows } from "@/firebase/helpers";
import RouteHeader from "@/layout/RouteHeader";
import Navbar from "@/layout/navbar/Navbar";
import Sidebar from "@/layout/sidebar/Sidebar";
import SearchedMoviesLoading from "@/loading/SearchedMoviesLoading";
import { firebaseApp } from "@/main";
import { categoryState } from "@/stores/store";
import { getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import Movie from "../Movie";
import Pagination from "../Pagination";
import { Toaster } from "../ui/toaster";
import MoviesLoading from "@/loading/MoviesLoading";

function Favorites() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const category = useRecoilValue(categoryState);
  const [pagination, setPagination] = useState({
    startIndex: 0,
    endIndex: 10,
  });
  const [isLoading, setIsLoading] = useState(true);

  const db = getFirestore(firebaseApp);

  const getFavMovies = async (uid: string) => {
    setIsLoading(true);
    await getFavoriteMovies(uid, db).then((movies) => {
      setFavoriteMovies(movies);
      setIsLoading(false);
    });
  };

  const getFavTvShows = async (uid: string) => {
    setIsLoading(true);
    await getFavoriteTvShows(uid, db).then((shows) => {
      setFavoriteMovies(shows);
      setIsLoading(false);
    });
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
          <RouteHeader />

          <Pagination
            totalItems={favoriteMovies.length}
            setPagination={setPagination}
          />
        </div>

        <div className="movie-container mt-6">
          {isLoading ? (
            <MoviesLoading />
          ) : (
            favoriteMovies.map((movie: any, idx: number) => {
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
            })
          )}
        </div>
      </div>

      <Sidebar />
      <Toaster />
    </section>
  );
}

export default Favorites;
