import { topRatedMovieOptions, topRatedTvShowOptions } from "@/api/api";
import SidebarLoading from "@/loading/SidebarLoading";
import {
  categoryState,
  favoriteMoviesState,
  favoriteTvShowState,
} from "@/stores/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import FavoriteMovies from "./FavoriteMovies";
import FavoriteTvShows from "./FavoriteTvShows";
import SmallMovieCard from "./SmallMovieCard";

function Sidebar() {
  const [topRatedShows, setTopRatedShows] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const category = useRecoilValue(categoryState);
  const favoriteMovies = useRecoilValue(favoriteMoviesState);
  const favoriteTvShows = useRecoilValue(favoriteTvShowState);
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

  const handleFavoritesNavigation = () => {
    navigate(
      category === "movie" ? "/favorites/movies" : "/favorites/tv-series"
    );
  };

  return (
    <div className="hidden lg:block py-8 bg-black lg:px-4 lg:w-[300px] xl:px-6 xl:w-[360px]">
      {/* Most rated movies section goes here ------------->  */}
      {/* -------------------------------->  */}
      <main className="">
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
          {category === "tv" ? (
            <FavoriteTvShows tvShows={favoriteTvShows} />
          ) : (
            <FavoriteMovies movies={favoriteMovies} />
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
