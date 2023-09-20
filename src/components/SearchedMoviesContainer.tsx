import SearchedMoviesLoading from "@/loading/SearchedMoviesLoading";
import { categoryState } from "@/stores/store";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Movie from "./Movie";

interface ContainerProps {
  movies: any[];
}

function SearchedMoviesContainer({ movies }: ContainerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const category = useRecoilValue(categoryState);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  // const getMovies = async () => {
  //   if (!query) return;

  //   setIsLoading(true);
  //   const options = searchMoviesOptions(query, null);
  //   await axios.request(options).then((response) => {
  //     setIsLoading(false);
  //     setMovies(response.data.results);
  //   });
  // };

  // const getTvShows = async () => {
  //   if (!query) return;

  //   setIsLoading(true);
  //   const options = searchTvShowsOptions(query);
  //   await axios.request(options).then((response) => {
  //     setIsLoading(false);
  //     setMovies(response.data.results);
  //   });
  // };

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     category === "movie" ? getMovies() : getTvShows();
  //   }, 600);

  //   return () => {
  //     clearTimeout(timer); // Clear the timer if the component unmounts or searchQuery changes before 2 seconds
  //   };
  // }, [query]);

  return (
    <main className="movie-container">
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
  );
}

export default SearchedMoviesContainer;
