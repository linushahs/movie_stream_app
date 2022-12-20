import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import Movie from "./Movie";

function Sidebar({ changeSearchState, searchString }) {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const API_KEY = "e9c1419451fdcd93d09f5ee89353e0ba";

  const getMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
    );

    const movies = await response.json();
    const threeMovies = [];
    for (let i = 0; i < 3; i++) {
      threeMovies.push(movies.results[i]);
    }
    setTopRatedMovies(threeMovies);
  };

  useEffect(() => getMovies, []);

  const handleSearchState = (e) => {
    changeSearchState(e.target.value);
  };
  return (
    <div className="hidden lg:block py-8 bg-black lg:px-8 xl:px-16 lg:w-[420px]">
      <header className="relative px-2 py-1.5 w-[220px] flex justify-center gap-2 items-center border-2 border-gray-dark rounded-3xl">
        <FiSearch className="text-2xl text-gray-light" />
        <input
          type="text"
          name="search"
          placeholder="Search"
          value={searchString}
          onChange={(e) => handleSearchState(e)}
          className="border-none outline-none text-white bg-black w-full rounded-xl"
        />
      </header>

      {/* Most rated movies section goes here ------------->  */}
      {/* -------------------------------->  */}
      <main className="mt-8">
        <h2 className=" text-white">Most Rated Movies</h2>
        <div className="movies-list mt-4">
          {topRatedMovies.map((movie, id) => (
            <Movie
              key={id}
              title={movie.title}
              poster={movie.poster_path}
              rating={movie.vote_average}
              releaseDate={movie.release_date}
            />
          ))}
        </div>
        <button className="px-4 py-2 bg-red rounded-lg w-full text-white">
          See more
        </button>
      </main>

      {/* Favorites of movies section goes here ---------->  */}
      {/* ----------------------------->  */}
      <main className="mt-8">
        <h2 className=" text-white">Favorites</h2>
        <div className="movies-list mt-4">
          {favorites[0] ? (
            topRatedMovies.map((movie, id) => (
              <Movie
                key={id}
                title={movie.title}
                poster={movie.poster_path}
                rating={movie.vote_average}
                releaseDate={movie.release_date}
              />
            ))
          ) : (
            <h3 className="text-gray-dark mb-4">No movies added</h3>
          )}
        </div>
        <button className="px-4 py-2 bg-red rounded-lg w-full text-white">
          See more
        </button>
      </main>
    </div>
  );
}

export default Sidebar;
