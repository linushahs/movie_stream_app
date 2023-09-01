import { searchOptions } from "@/api/api";
import SearchedMoviesLoading from "@/loading/SearchedMoviesLoading";
import axios from "axios";
import { useEffect, useState } from "react";
import Movie from "./Movie";

function SearchedMoviesContainer({ searchString }: { searchString: string }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getMovies = async () => {
    setIsLoading(true);
    const options = searchOptions(searchString);
    await axios.request(options).then((response) => {
      setIsLoading(false);
      setMovies(response.data.results);
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getMovies();
    }, 800);

    return () => {
      clearTimeout(timer); // Clear the timer if the component unmounts or searchString changes before 2 seconds
    };
  }, [searchString]);

  return (
    <div className="w-full min-h-screen bg-black py-8 pr-8 pl-[112px] lg:pl-[250px] xl:pl-[calc(260px+32px)] border-r-[0.5px] border-r-gray-dark/50 ">
      <header className="">
        <ul className="flex gap-4">
          <li className="text-gray-light hover:text-white cursor-pointer">
            TV Series
          </li>
          <li className="text-white hover:text-white cursor-pointer">Movies</li>
        </ul>
      </header>
      <main className="flex flex-wrap gap-4 mt-4">
        {isLoading ? (
          <SearchedMoviesLoading />
        ) : movies[0] ? (
          movies.map((movie: any, id) => (
            <Movie
              key={id}
              poster={movie.poster_path}
              title={movie.title || movie.name}
              rating={movie.vote_average.toFixed(1)}
              releaseDate={movie.release_date}
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
