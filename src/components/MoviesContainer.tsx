import Header from "@/layout/Header";
import MoviesLoading from "@/loading/MoviesLoading";
import SliderLoading from "@/loading/SliderLoading";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { trendingMovieOptions, trendingTvOptions } from "../api/api";
import { categoryState, favoriteMoviesState } from "../stores/store";
import Movie from "./Movie";
import Slider from "./Slider";
import { getFavoriteMovies } from "@/firebase/helpers";
import { getFirestore } from "firebase/firestore";
import { firebaseApp } from "@/main";

function MoviesContainer() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTvShows, setTrendingTvShows] = useState([]);
  const category = useRecoilValue(categoryState);
  const [favoriteMovies, setFavoriteMovies] =
    useRecoilState(favoriteMoviesState);
  const [isLoading, setIsLoading] = useState(true);

  const db = getFirestore(firebaseApp);

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
    const movies = await getFavoriteMovies(db);
    setFavoriteMovies(movies);
  };

  useEffect(() => {
    setIsLoading(true);
    category === "movie" ? getMovies() : getTvShows();
  }, [category]);

  useEffect(() => {
    getFavMovies();
  }, []);

  console.log("runned");

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
