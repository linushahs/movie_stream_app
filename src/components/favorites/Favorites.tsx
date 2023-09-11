import Header from "@/layout/Header";
import Movie from "../Movie";

function Favorites() {
  return (
    <section className="main-container">
      <Header />

      <div className="movie-container">
        {/* <Movie
          key={movie.id}
          id={movie.id}
          poster_path={movie.poster_path}
          title={movie.title || movie.name}
          rating={movie.vote_average.toFixed(1)}
          release_date={movie.release_date}
        /> */}
      </div>
    </section>
  );
}

export default Favorites;
