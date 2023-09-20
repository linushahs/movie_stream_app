import SmallMovieCard from "./SmallMovieCard";

function FavoriteMovies({ movies }: { movies: any }) {
  return (
    <>
      {movies[0] ? (
        movies.map((movie: any, idx: number) => {
          if (idx < 3) {
            return (
              <SmallMovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                poster_path={movie.poster_path}
                rating={movie.rating}
                release_date={movie.release_date}
              />
            );
          }
        })
      ) : (
        <h3 className="text-gray-dark mb-4">No movies added</h3>
      )}
    </>
  );
}

export default FavoriteMovies;
