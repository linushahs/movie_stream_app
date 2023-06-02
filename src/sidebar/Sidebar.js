import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import Movie from "./Movie";
import axios from "axios";

const options = {
  url: "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOWMxNDE5NDUxZmRjZDkzZDA5ZjVlZTg5MzUzZTBiYSIsInN1YiI6IjVmODA2MDE2YzgxMTNkMDAzOGFlNTNmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nQRs-HcDu6UkTY631fHnxO4ylkoeFH0P48MSEPj1h0k",
  },
};

function Sidebar({ changeSearchState, searchString }) {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const getTopRatedMovies = async () => {
    const movies = await axios.request(options);
    const threeMovies = [];
    for (let i = 0; i < 3; i++) {
      threeMovies.push(movies.data.results[i]);
    }
    setTopRatedMovies(threeMovies);
  };

  useEffect(() => getTopRatedMovies, []);

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
