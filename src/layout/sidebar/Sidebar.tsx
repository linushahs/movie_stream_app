import { topRatedMovieOptions, topRatedTvShowOptions } from "@/api/api";
import { getFavoriteMovies, getFavoriteTvShows } from "@/firebase/helpers";
import SidebarLoading from "@/loading/SidebarLoading";
import { firebaseApp } from "@/main";
import {
  categoryState,
  favoriteShowsState,
  userDataState,
} from "@/stores/store";
import axios from "axios";
import { getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import FavoriteMovies from "./FavoriteMovies";
import FavoriteTvShows from "./FavoriteTvShows";
import SmallMovieCard from "./SmallMovieCard";

function Sidebar() {
  const [topRatedShows, setTopRatedShows] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const category = useRecoilValue(categoryState);
  const [favoriteShows, setFavoriteShows] = useRecoilState(favoriteShowsState);
  const { uid } = useRecoilValue(userDataState);
  const db = getFirestore(firebaseApp);
  const navigate = useNavigate();

  const getTopRatedMovies = async () => {
    setIsLoading(true);
    const options = topRatedMovieOptions(1);
    await axios.request(options).then((response) => {
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

  const getFavMovies = async () => {
    await getFavoriteMovies(uid, db).then((movies) => {
      setFavoriteShows(movies);
    });
  };

  const getFavTvShows = async () => {
    await getFavoriteTvShows(uid, db).then((shows) => {
      setFavoriteShows(shows);
    });
  };

  useEffect(() => {
    if (category === "movie") {
      getTopRatedMovies();
      uid && getFavMovies();
    } else {
      getTopRatedTvShows();
      uid && getFavTvShows();
    }
  }, [category, uid]);

  const handleFavoritesNavigation = () => {
    navigate(
      category === "movie" ? "/favorites/movies" : "/favorites/tv-series"
    );
  };

  const handleTopRatedNavigation = () => {
    navigate(
      category === "movie" ? "/top-rated/movies" : "/top-rated/tv-series"
    );
  };

  return (
    <div className="sidebar">
      {/* Most rated movies section goes here ------------->  */}
      {/* -------------------------------->  */}
      <main className="">
        <h2 className=" text-white">Top Rated Shows</h2>
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
        <button
          onClick={handleTopRatedNavigation}
          className="px-4 py-2 bg-red rounded-lg w-full text-white"
        >
          See more
        </button>
      </main>

      {/* Favorites of movies section goes here ---------->  */}
      {/* ----------------------------->  */}
      <main className="mt-8">
        <h2 className=" text-white">Favorites</h2>
        <div className="movies-list mt-4">
          {category === "tv" ? (
            <FavoriteTvShows tvShows={favoriteShows} />
          ) : (
            <FavoriteMovies movies={favoriteShows} />
          )}
        </div>
        {favoriteShows.length && (
          <button
            onClick={handleFavoritesNavigation}
            className="px-4 py-2 bg-red rounded-lg w-full text-white"
          >
            See more
          </button>
        )}
      </main>
    </div>
  );
}

export default Sidebar;
