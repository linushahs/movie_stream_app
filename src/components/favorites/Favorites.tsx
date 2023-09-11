import { getFavoriteMovies } from "@/firebase/helpers";
import FavoritesHeader from "@/layout/FavoritesHeader";
import Navbar from "@/layout/navbar/Navbar";
import Sidebar from "@/layout/sidebar/Sidebar";
import { firebaseApp } from "@/main";
import { favoriteMoviesState } from "@/stores/store";
import { getFirestore } from "firebase/firestore";
import { useEffect } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { useRecoilState } from "recoil";
import Movie from "../Movie";

function Favorites() {
  const [favoriteMovies, setFavoriteMovies] =
    useRecoilState(favoriteMoviesState);

  const db = getFirestore(firebaseApp);

  const getFavMovies = async () => {
    const movies = await getFavoriteMovies(db);
    setFavoriteMovies(movies);
  };

  useEffect(() => {
    getFavMovies();
  }, []);

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
    </section>
  );
}

export default Favorites;
