import React, { useState, useEffect } from "react";
import Movie from "./Movie";

function SearchedMovies({ searchString }) {
  const [movies, setMovies] = useState([]);
  const API_KEY = "e9c1419451fdcd93d09f5ee89353e0ba";

  const getMovies = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchString}`
    );

    const data = await res.json();
    console.log(data);
    setMovies(data.results);
  };

  useEffect(() => {
    getMovies();
  }, [searchString]);

  return (
    <div className="w-full bg-black py-8 pr-4 xl:pr-16 pl-[98px] lg:pl-[270px]  xl:pl-[340px] border-r-[0.5px] border-r-gray-dark/50 ">
      <header className="">
        <ul className="flex gap-4">
          <li className="text-gray-light hover:text-white cursor-pointer">
            TV Series
          </li>
          <li className="text-white hover:text-white cursor-pointer">Movies</li>
        </ul>
      </header>
      <main className="flex flex-wrap gap-4 mt-4">
        {movies[0] ? (
          movies.map((movie, id) => (
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
