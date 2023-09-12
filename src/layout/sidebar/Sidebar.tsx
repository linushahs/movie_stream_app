import { topRatedMovieOptions, topRatedTvShowOptions } from "@/api/api";
import SidebarLoading from "@/loading/SidebarLoading";
import {
  categoryState,
  favoriteMoviesState,
  searchQueryState,
} from "@/stores/store";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useRecoilState, useRecoilValue } from "recoil";
import SmallMovieCard from "./SmallMovieCard";
import { useNavigate, useSearchParams } from "react-router-dom";

function Sidebar() {
  const [topRatedShows, setTopRatedShows] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const category = useRecoilValue(categoryState);
  const favoriteMovies = useRecoilValue(favoriteMoviesState);
  const navigate = useNavigate();

  const getTopRatedMovies = async () => {
    setIsLoading(true);
    await axios.request(topRatedMovieOptions).then((response) => {
      const threeMovies: any = [];
      for (let i = 0; i < 3; i++) {
        threeMovies.push(response.data.results[i]);
      }
      setTopRatedShows([...threeMovies]);
      setIsLoading(false);
    });
  };

  const getTopRatedTvShows = async () => {
    setIsLoading(true);
    await axios.request(topRatedTvShowOptions).then((response) => {
      const threeMovies: any = [];
      for (let i = 0; i < 3; i++) {
        threeMovies.push(response.data.results[i]);
      }
      setTopRatedShows([...threeMovies]);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    category === "movie" ? getTopRatedMovies() : getTopRatedTvShows();
  }, [category]);

  const handleSearchState = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchParams({ q: query });
  };

  const handleFavoritesNavigation = () => {
    navigate(
      category === "movie" ? "/favorites/movies" : "/favorites/tv-series"
    );
  };

  return (
    <div className="hidden lg:block py-8 bg-black lg:px-8 lg:w-[420px]">
      <header className="relative px-2 py-1.5 w-[220px] flex justify-center gap-2 items-center border-2 border-gray-dark rounded-3xl">
        <FiSearch className="text-2xl text-gray-light" />
        <input
          type="text"
          name="search"
          placeholder="Search"
          value={searchParams.get("q") || ""}
          onChange={(e) => handleSearchState(e)}
          className="pl-1 border-none outline-none text-white bg-black w-full rounded-xl placeholder:text-gray-light"
        />
      </header>

      {/* Most rated movies section goes here ------------->  */}
      {/* -------------------------------->  */}
      <main className="mt-8">
        <h2 className=" text-white">Most Rated Movies</h2>
        <div className="flex flex-col gap-y-2 mt-4">
          {isLoading ? (
            <SidebarLoading />
          ) : (
            topRatedShows.map((show: any) => (
              <SmallMovieCard
                key={show.id}
                id={show.id}
                title={show.title || show.name}
                poster_path={show.poster_path}
                rating={show.vote_average}
                release_date={show.release_date || show.first_air_date}
              />
            ))
          )}
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
          {favoriteMovies[0] ? (
            favoriteMovies.map((movie: any, idx) => {
              if (idx < 3) {
                return (
                  <SmallMovieCard
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    poster_path={movie.poster_path}
                    rating={movie.vote_average}
                    release_date={movie.release_date}
                  />
                );
              }
            })
          ) : (
            <h3 className="text-gray-dark mb-4">No movies added</h3>
          )}
        </div>
        <button
          onClick={handleFavoritesNavigation}
          className="px-4 py-2 bg-red rounded-lg w-full text-white"
        >
          See more
        </button>
      </main>
    </div>
  );
}

export default Sidebar;
