import axios from "axios";
import { useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Movie from "./Movie";
import { useRecoilState } from "recoil";
import { categoryState } from "../stores/store";
import { movieOptions, tvOptions } from "../api/api";
import Slider from "./Slider";
import { twMerge } from "tailwind-merge";

function Main() {
  const [trendingMovies, setTrendingMovies] = useState<[] | null>(null);
  const [trendingTvShows, setTrendingTvShows] = useState<[] | null>(null);
  const [category, setCategory] = useRecoilState(categoryState);
  const [isLoading, setIsLoading] = useState(true);

  const getMovies = async () => {
    try {
      setIsLoading(true); // Set isLoading to true before making the request
      const movies = await axios.request(movieOptions);
      setTrendingMovies(movies.data.results);
    } catch (error) {
      // Handle error if necessary
    } finally {
      setIsLoading(false);
    }
  };

  const getTvShows = async () => {
    try {
      setIsLoading(true);
      const tvShows = await axios.request(tvOptions);
      setTrendingTvShows(tvShows.data.results);
    } catch (error) {
      // Handle error if necessary
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (category === "movie") {
      console.log("Fetching movies...");
      getMovies();
    } else {
      console.log("Fetching tv shows...");
      getTvShows();
    }
  }, []);

  const handleTvShowsClick = () => {
    setCategory("tv");
    getTvShows();
  };

  const handleMoviesClick = () => {
    setCategory("movie");
    getMovies();
  };

  if (isLoading) return <h1> Loading...</h1>;

  return (
    <div className="w-full bg-black py-8 pr-8 pl-[112px] lg:pl-[250px] xl:pl-[calc(260px+32px)] border-r-[0.5px] border-r-gray-dark/50 ">
      <header className="">
        <ul className="flex gap-4 text-gray-light">
          <li
            onClick={handleTvShowsClick}
            className={twMerge(
              "text-gray-light hover:text-white cursor-pointer",
              category === "tv" && "text-white"
            )}
          >
            TV Series
          </li>
          <li
            onClick={handleMoviesClick}
            className={twMerge(
              "text-gray-light hover:text-white cursor-pointer",
              category === "movie" && "text-white"
            )}
          >
            Movies
          </li>
        </ul>
      </header>
      <main className="mt-4">
        {/* ----------------------------------> */}
        {/* //Latest section of movies slider goes here */}
        {category === "movie" && <Slider movie={trendingMovies?.[0]} />}
        {category === "tv" && <Slider movie={trendingTvShows?.[1]} />}

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
            {category === "movie" &&
              trendingMovies?.map((movie: any) => (
                <Movie
                  key={movie.id}
                  poster={movie.poster_path}
                  title={movie.title || movie.name}
                  rating={movie.vote_average.toFixed(1)}
                  releaseDate={movie.release_date}
                />
              ))}

            {category === "tv" &&
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
              })}
          </main>
        </div>
      </main>
    </div>
  );
}

export default Main;
