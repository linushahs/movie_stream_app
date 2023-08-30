import axios from "axios";
import { useEffect, useState } from "react";
import Movie from "./components/Movie";
import SearchedMoviesLoading from "./loading/SearchedMoviesLoading";

function SearchedMovies({ searchString }: { searchString: string }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const options = {
    url: `https://api.themoviedb.org/3/search/movie?query=${searchString}&include_adult=false&language=en-US&page=1`,
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOWMxNDE5NDUxZmRjZDkzZDA5ZjVlZTg5MzUzZTBiYSIsInN1YiI6IjVmODA2MDE2YzgxMTNkMDAzOGFlNTNmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nQRs-HcDu6UkTY631fHnxO4ylkoeFH0P48MSEPj1h0k",
    },
  };

  const getMovies = async () => {
    setIsLoading(true);
    await axios.request(options).then((response) => {
      setIsLoading(false);
      setMovies(response.data.results);
    });
  };

  useEffect(() => {
    getMovies();
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
          <div>No movies</div>
        )}
      </main>
    </div>
  );
}

export default SearchedMovies;
