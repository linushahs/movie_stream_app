import RouteHeader from "@/layout/RouteHeader";
import Navbar from "@/layout/navbar/Navbar";
import Sidebar from "@/layout/sidebar/Sidebar";
import MoviesLoading from "@/loading/MoviesLoading";
import { favoriteShowsState } from "@/stores/store";
import { Suspense, lazy, useState } from "react";
import { useRecoilValue } from "recoil";
import Pagination from "../Pagination";
import { Toaster } from "../ui/toaster";

const DynamicMovie = lazy(() => import("../Movie"));

function Favorites() {
  const favoriteShows = useRecoilValue(favoriteShowsState);
  const [pagination, setPagination] = useState({
    startIndex: 0,
    endIndex: 10,
  });

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
      </div>

      <Sidebar />
      <Toaster />
    </section>
  );
}

export default Favorites;
