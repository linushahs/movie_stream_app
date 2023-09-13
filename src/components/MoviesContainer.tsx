import { getFavoriteMovies, getFavoriteTvShows } from "@/firebase/helpers";
import Header from "@/layout/Header";
import MoviesLoading from "@/loading/MoviesLoading";
import SliderLoading from "@/loading/SliderLoading";
import { firebaseDB } from "@/main";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { trendingMovieOptions, trendingTvOptions } from "../api/api";
import {
  categoryState,
  favoriteMoviesState,
  favoriteTvShowState,
  userDataState,
} from "../stores/store";
import Movie from "./Movie";
import SearchedMoviesContainer from "./SearchedMoviesContainer";
import Slider from "./Slider";

function MoviesContainer() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTvShows, setTrendingTvShows] = useState([]);
  const category = useRecoilValue(categoryState);
  const setFavoriteMovies = useSetRecoilState(favoriteMoviesState);
  const setFavoriteTvShows = useSetRecoilState(favoriteTvShowState);
  const userData = useRecoilValue(userDataState);
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  const getMovies = async () => {
    setIsLoading(true); // Set isLoading to true before making the request
    await axios.request(trendingMovieOptions).then((res) => {
      setTrendingMovies(res.data.results);
      setIsLoading(false);
    });
  };

  const getTvShows = async () => {
    setIsLoading(true);
    await axios.request(trendingTvOptions).then((res) => {
      setTrendingTvShows(res.data.results);
      setIsLoading(false);
    });
  };

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
    setIsLoading(true);
    category === "movie" ? getMovies() : getTvShows();
  }, [category]);

  useEffect(() => {
    category === "movie" ? getFavMovies() : getFavTvShows();
  }, [userData.email, category]);

  if (searchParams.get("q")) return <SearchedMoviesContainer />;

  return (
    <div className="main-container">
      <Header />
      <main className="mt-4">
        {/* ----------------------------------> */}
        {/* //Latest section of movies slider goes here */}
        {isLoading ? (
          <SliderLoading />
        ) : category === "movie" ? (
          trendingMovies.length && <Slider movie={trendingMovies?.[0]} />
        ) : (
          trendingTvShows.length && <Slider movie={trendingTvShows?.[0]} />
        )}

        {/* Latest section of movies ends here -------------->  */}
        {/* Trending movies section starts here ---------------->  */}
        <div className="mt-6 text-white w-full overflow-hidden">
          <header className="mb-4 flex justify-between items-center">
            <h3>Trending {category === "movie" ? "Movies" : "TV Shows"}</h3>
            <div className="flex gap-2">
              <MdKeyboardArrowLeft className="border-[1.5px] cursor-pointer p-1 text-3xl border-white rounded-full" />
              <MdKeyboardArrowRight className="border-[1.5px] p-1 text-3xl cursor-pointer border-white rounded-full" />
            </div>
          </header>
          <main className="movie-container">
            {isLoading ? (
              <MoviesLoading />
            ) : category === "movie" ? (
              trendingMovies?.map((movie: any) => (
                <Movie
                  key={movie.id}
                  id={movie.id}
                  poster_path={movie.poster_path}
                  title={movie.title || movie.name}
                  rating={movie.vote_average.toFixed(1)}
                  release_date={movie.release_date}
                />
              ))
            ) : (
              trendingTvShows?.map((tvShow: any) => {
                return (
                  <Movie
                    key={tvShow.id}
                    id={tvShow.id}
                    poster_path={tvShow.poster_path}
                    title={tvShow.name}
                    rating={tvShow.vote_average.toFixed(1)}
                    release_date={tvShow.first_air_date}
                  />
                );
              })
            )}
          </main>
        </div>
      </main>
    </div>
  );
}

export default MoviesContainer;
