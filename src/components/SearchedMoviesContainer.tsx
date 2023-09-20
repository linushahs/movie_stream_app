import SearchedMoviesLoading from "@/loading/SearchedMoviesLoading";
import Movie from "./Movie";

interface ContainerProps {
  movies: any[];
  isLoading: boolean;
}

function SearchedMoviesContainer({ movies, isLoading }: ContainerProps) {
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
        <div className="h-20 w-full text-gray-light">No movies found</div>
      )}
    </main>
  );
}

export default SearchedMoviesContainer;
