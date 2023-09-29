import Header from "@/layout/Header";
import MoviesLoading from "@/loading/MoviesLoading";
import SliderLoading from "@/loading/SliderLoading";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { trendingMovieOptions, trendingTvOptions } from "../api/api";
import { categoryState } from "../stores/store";
import Pagination from "./Pagination";
import Slider from "./Slider";
import TrendingShows from "./TrendingShows";

function MoviesContainer() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTvShows, setTrendingTvShows] = useState([]);
  const category = useRecoilValue(categoryState);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    startIndex: 0,
    endIndex: 10,
  });

  const getMovies = async () => {
    setIsLoading(true); // Set isLoading to true before making the request
    await axios.request(trendingMovieOptions).then((res) => {
      setTrendingMovies(res.data.results);
      setIsLoading(false);
    });
  };

  const getTvShows = async () => {
    setIsLoading(true);
    await axios.request(trendingTvOptions).then((res) => {
      setTrendingTvShows(res.data.results);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    setIsLoading(true);
    category === "movie" ? getMovies() : getTvShows();
  }, [category]);

  return (
    <div className="main-container">
      <Header />

      <main className="mt-4">
        {/* ----------------------------------> */}
        {/* //Latest section of movies slider goes here */}
        {isLoading ? (
          <SliderLoading />
        ) : category === "movie" ? (
          trendingMovies.length && <Slider movie={trendingMovies?.[0]} />
        ) : (
          trendingTvShows.length && <Slider movie={trendingTvShows?.[0]} />
        )}

        {/* Latest section of movies ends here -------------->  */}
        {/* Trending movies section starts here ---------------->  */}
        <div className="mt-6 text-white w-full overflow-hidden">
          <header className="mb-4 flex justify-between items-center">
            <h3>Trending {category === "movie" ? "Movies" : "TV Shows"}</h3>
            <Pagination
              totalItems={trendingMovies.length}
              setPagination={setPagination}
            />
          </header>
          <main className="movie-container">
            {isLoading ? (
              <MoviesLoading />
            ) : (
              <TrendingShows
                trendingShows={
                  category === "movie" ? trendingMovies : trendingTvShows
                }
                pagination={pagination}
              />
            )}
          </main>
        </div>
      </main>
    </div>
  );
}

export default MoviesContainer;
