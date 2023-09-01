import Header from "@/layout/Header";
import MoviesLoading from "@/loading/MoviesLoading";
import SliderLoading from "@/loading/SliderLoading";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useRecoilValue } from "recoil";
import { movieOptions, tvOptions } from "../api/api";
import { categoryState } from "../stores/store";
import Movie from "./Movie";
import Slider from "./Slider";

function MoviesContainer() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTvShows, setTrendingTvShows] = useState([]);
  const category = useRecoilValue(categoryState);
  const [isLoading, setIsLoading] = useState(true);

  const getMovies = async () => {
    setIsLoading(true); // Set isLoading to true before making the request
    await axios.request(movieOptions).then((res) => {
      setTrendingMovies(res.data.results);
      setIsLoading(false);
    });
  };

  const getTvShows = async () => {
    setIsLoading(true);
    await axios.request(tvOptions).then((res) => {
      setTrendingTvShows(res.data.results);
      setIsLoading(false);
    });
  };

  // useEffect(() => {
  //   setIsLoading(true);
  //   if (category !== "movie") {
  //     console.log("Fetching movies...");
  //     getMovies();
  //   } else {
  //     console.log("Fetching tv shows...");
  //     getTvShows();
  //   }
  // }, [category]);

  return (
    <div className="w-full min-h-screen bg-black py-8 pr-8 pl-[112px] lg:pl-[250px] xl:pl-[calc(260px+32px)] border-r-[0.5px] border-r-gray-dark/50 ">
      <Header />
      <main className="mt-4">
        {/* ----------------------------------> */}
        {/* //Latest section of movies slider goes here */}
        {isLoading ? (
          <SliderLoading />
        ) : category === "movie" ? (
          trendingMovies.length && <Slider movie={trendingMovies?.[0]} />
        ) : (
          trendingTvShows.length && <Slider movie={trendingTvShows?.[1]} />
        )}

        {/* Latest section of movies ends here -------------->  */}
        {/* Trending movies section starts here ---------------->  */}
        <div className="mt-6 text-white w-full overflow-hidden">
          <header className="mb-4 flex justify-between items-center">
            <h3>Trending {category === "movie" ? "Movies" : "TV Shows"}</h3>
            <div className="flex gap-2">
              <MdKeyboardArrowLeft className="border-[1.5px] cursor-pointer p-1 text-3xl border-white rounded-full" />
              <MdKeyboardArrowRight className="border-[1.5px] p-1 text-3xl cursor-pointer border-white rounded-full" />
            </div>
          </header>
          <main className="flex flex-wrap gap-4">
            {isLoading ? (
              <MoviesLoading />
            ) : category === "movie" ? (
              trendingMovies?.map((movie: any) => (
                <Movie
                  key={movie.id}
                  poster={movie.poster_path}
                  title={movie.title || movie.name}
                  rating={movie.vote_average.toFixed(1)}
                  releaseDate={movie.release_date}
                />
              ))
            ) : (
              trendingTvShows?.map((tvShow: any) => {
                return (
                  <Movie
                    key={tvShow.id}
                    poster={tvShow.poster_path}
                    title={tvShow.name}
                    rating={tvShow.vote_average.toFixed(1)}
                    releaseDate={tvShow.first_air_date}
                  />
                );
              })
            )}
          </main>
        </div>
      </main>
    </div>
  );
}

export default MoviesContainer;
