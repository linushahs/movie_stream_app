import SearchedMoviesLoading from "@/loading/SearchedMoviesLoading";
import Movie from "../Movie";
import { ContainerProps } from "../search/SearchedMoviesContainer";

function TopRatedContainer({
  movies,
  isLoading,
  pagination: { startIndex, endIndex },
}: ContainerProps) {
  return (
    <main className="movie-container">
      {isLoading ? (
        <SearchedMoviesLoading />
      ) : (
        movies[0] &&
        movies.map((movie: any, idx: number) => {
          if (idx >= startIndex && idx < endIndex) {
            return (
              <Movie
                key={movie.id}
                id={movie.id}
                poster_path={movie.poster_path}
                title={movie.title || movie.name}
                rating={movie.vote_average.toFixed(1)}
                release_date={movie.release_date || movie.first_air_date}
              />
            );
          }
        })
      )}
    </main>
  );
}

export default TopRatedContainer;
