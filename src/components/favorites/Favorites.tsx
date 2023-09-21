import { getFavoriteMovies, getFavoriteTvShows } from "@/firebase/helpers";
import FavoritesHeader from "@/layout/RouteHeader";
import Navbar from "@/layout/navbar/Navbar";
import Sidebar from "@/layout/sidebar/Sidebar";
import { firebaseApp } from "@/main";
import { favoriteMoviesState } from "@/stores/store";
import { getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { useMatches } from "react-router-dom";
import { useRecoilState } from "recoil";
import Movie from "../Movie";
import { Toaster } from "../ui/toaster";
import { twMerge } from "tailwind-merge";

function Favorites() {
  const [favoriteMovies, setFavoriteMovies] =
    useRecoilState(favoriteMoviesState);
  const [{ pathname }] = useMatches();
  const [pageNo, setPageNo] = useState(1);
  const btnStyle = {
    nextBtnStyle: favoriteMovies.length < pageNo * 10 ? "disabled" : "default",
    prevBtnStyle: pageNo <= 1 ? "disabled" : "default",
  };
  const startIndex = (pageNo - 1) * 10;
  const endIndex = pageNo * 10;

  console.log(startIndex, endIndex);

  const db = getFirestore(firebaseApp);

  const getFavMovies = async (uid: string) => {
    const movies = await getFavoriteMovies(uid, db);
    setFavoriteMovies(movies);
  };

  const getFavTvShows = async (uid: string) => {
    const movies = await getFavoriteTvShows(uid, db);
    setFavoriteMovies(movies);
  };

  const goToNextPage = async () => {
    if (favoriteMovies.length > pageNo * 10) {
      setPageNo(pageNo + 1);
      return;
    }
  };

  const goToPreviousPage = async () => {
    if (pageNo > 1) {
      setPageNo(pageNo - 1);
      return;
    }
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

          <div className="hidden sm:flex justify-end gap-2 text-white">
            <button
              onClick={goToPreviousPage}
              className={twMerge(
                "border border-gray-dark p-2 rounded-full hover:bg-dark",
                btnStyle.prevBtnStyle === "disabled" &&
                  "disabled:bg-gray-dark disabled:opacity-50"
              )}
              disabled={btnStyle.prevBtnStyle === "disabled"}
            >
              <HiOutlineChevronLeft className="text-xl" />
            </button>
            <button
              onClick={goToNextPage}
              className={twMerge(
                "border border-gray-dark p-2 rounded-full hover:bg-dark",
                btnStyle.nextBtnStyle === "disabled" &&
                  "disabled:bg-gray-dark disabled:opacity-50"
              )}
              disabled={btnStyle.nextBtnStyle === "disabled"}
            >
              <HiOutlineChevronRight className="text-xl" />
            </button>
          </div>
        </div>

        <div className="movie-container mt-6">
          {favoriteMovies.map((movie: any, idx: number) => {
            if (idx >= startIndex && idx < endIndex) {
              return (
                <Movie
                  key={movie.id}
                  id={movie.id}
                  poster_path={movie.poster_path}
                  title={movie.title || movie.name}
                  rating={parseInt(parseInt(movie.rating).toFixed(1))}
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
