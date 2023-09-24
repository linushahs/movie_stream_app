import RouteHeader from "@/layout/RouteHeader";
import Navbar from "@/layout/navbar/Navbar";
import Sidebar from "@/layout/sidebar/Sidebar";
import MoviesLoading from "@/loading/MoviesLoading";
import {
  categoryState,
  favoriteShowsState,
  userDataState,
} from "@/stores/store";
import { Suspense, lazy, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Pagination from "../Pagination";
import { Toaster } from "../ui/toaster";

const DynamicMovie = lazy(() => import("../Movie"));

function Favorites() {
  const category = useRecoilValue(categoryState);
  const favoriteShows = useRecoilValue(favoriteShowsState);
  const [pagination, setPagination] = useState({
    startIndex: 0,
    endIndex: 10,
  });
  const { uid } = useRecoilValue(userDataState);
  const navigate = useNavigate();

  const handleLinkNavigation = () => {
    navigate(category === "movie" ? "/home/movies" : "/home/tv-series");
  };

  return (
    <section className="App flex">
      <Navbar />

      <div className="main-container">
        <div className="flex justify-between ">
          <RouteHeader />

          <Pagination
            totalItems={favoriteShows.length}
            setPagination={setPagination}
          />
        </div>
        <div className="movie-container mt-6">
          <Suspense fallback={<MoviesLoading />}>
            {favoriteShows.map((movie: any, idx: number) => {
              if (idx >= pagination.startIndex && idx < pagination.endIndex) {
                return (
                  <DynamicMovie
                    key={movie.id}
                    id={movie.id}
                    poster_path={movie.poster_path}
                    title={movie.title || movie.name}
                    rating={movie.rating}
                    release_date={movie.release_date}
                  />
                );
              }
            })}
          </Suspense>
        </div>

        {!uid && (
          <div className="w-fit text-lg text-gray-light">
            <h1 className="">It seems like you haven't signed it yet.</h1>
            <span className="text-white underline">
              Please{" "}
              <a href="" className="">
                signin
              </a>
            </span>
          </div>
        )}

        {uid && favoriteShows.length === 0 && (
          <div className="w-fit text-lg text-gray-light">
            <h1 className="">It seems like you haven't added any shows yet.</h1>
            <button
              onClick={handleLinkNavigation}
              className="underline cursor-pointer text-white"
            >
              Explore and add to favorites
            </button>
          </div>
        )}
      </div>

      <Sidebar />
      <Toaster />
    </section>
  );
}

export default Favorites;
