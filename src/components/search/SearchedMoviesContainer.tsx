import SearchedMoviesLoading from "@/loading/SearchedMoviesLoading";
import Movie from "../Movie";
import { useRecoilValue } from "recoil";
import { categoryState } from "@/stores/store";

interface ContainerProps {
  movies: any[];
  isLoading: boolean;
  pagination: {
    startIndex: number;
    endIndex: number;
  };
}

function SearchedMoviesContainer({
  movies,
  isLoading,
  pagination: { startIndex, endIndex },
}: ContainerProps) {
  const category = useRecoilValue(categoryState);

  return (
    <main className="movie-container">
      {isLoading ? (
        <SearchedMoviesLoading />
      ) : movies[0] ? (
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
      ) : (
        <div className="h-20 w-full text-gray-light">
          No {category === "movie" ? "movies" : "tv shows"} found
        </div>
      )}
    </main>
  );
}

export default SearchedMoviesContainer;
