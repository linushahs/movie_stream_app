import { searchMoviesOptions, searchTvShowsOptions } from "@/api/api";
import Header from "@/layout/Header";
import SearchedMoviesLoading from "@/loading/SearchedMoviesLoading";
import { categoryState } from "@/stores/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Movie from "./Movie";

function SearchedMoviesContainer() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const category = useRecoilValue(categoryState);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const getMovies = async () => {
    if (!query) return;

    setIsLoading(true);
    const options = searchMoviesOptions(query);
    await axios.request(options).then((response) => {
      setIsLoading(false);
      setMovies(response.data.results);
    });
  };

  const getTvShows = async () => {
    if (!query) return;

    setIsLoading(true);
    const options = searchTvShowsOptions(query);
    await axios.request(options).then((response) => {
      setIsLoading(false);
      setMovies(response.data.results);
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      category === "movie" ? getMovies() : getTvShows();
    }, 600);

    return () => {
      clearTimeout(timer); // Clear the timer if the component unmounts or searchQuery changes before 2 seconds
    };
  }, [query]);

  return (
    <div className="w-full min-h-screen bg-black py-8 pr-8 pl-[112px] lg:pl-[250px] xl:pl-[calc(260px+32px)] border-r-[0.5px] border-r-gray-dark/50 ">
      <Header />
      <main className="mt-6 grid md:grid-cols-4 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-x-4 gap-y-8">
        {isLoading ? (
          <SearchedMoviesLoading />
        ) : movies[0] ? (
          movies.map((movie: any, id) => (
            <Movie
              key={id}
              id={movie.id}
              poster_path={movie.poster_path}
              title={movie.title || movie.name}
              rating={movie.vote_average.toFixed(1)}
              release_date={movie.release_date || movie.first_air_date}
            />
          ))
        ) : (
          <div className="h-20 w-full flex justify-center items-center text-gray-light">
            No movies found
          </div>
        )}
      </main>
    </div>
  );
}

export default SearchedMoviesContainer;
