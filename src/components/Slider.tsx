import {
  movieDetailsOptions,
  movieTrailersOptions,
  tvShowDetailsOptions,
  tvShowTrailersOptions,
} from "@/api/api";
import { categoryState, isWatchOpenState } from "@/stores/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import FavoriteButton from "./favorites/FavoriteButton";
import SliderItemModal from "./SliderItemModal";

interface SliderProps {
  movie: any;
}

export default function Slider({ movie }: SliderProps) {
  const img_path = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  const category = useRecoilValue(categoryState);
  const setIsWatchOpen = useSetRecoilState(isWatchOpenState);
  const [trailer, setTrailer] = useState<any>({});

  const getMovieDetails = async () => {
    if (!movie.id) return;
    const options = movieDetailsOptions(movie.id);
    await axios
      .request(options)
      .then((res) => {
        setGenres(res.data.genres);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const getTvShowDetails = async () => {
    if (!movie.id) return;
    const options = tvShowDetailsOptions(movie.id);
    await axios
      .request(options)
      .then((res) => {
        setGenres(res.data.genres);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const getMovieTrailer = async () => {
    if (!movie.id) return;

    const options = movieTrailersOptions(movie.id);
    await axios
      .request(options)
      .then((res) => {
        const results = res.data.results;
        if (results) {
          setTrailer(results.filter((t: any) => t.type === "Trailer")[0]);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const getTvShowTrailer = async () => {
    if (!movie.id) return;

    const options = tvShowTrailersOptions(movie.id);
    await axios
      .request(options)
      .then((res) => {
        const results = res.data.results;
        if (results) {
          setTrailer(results.filter((t: any) => t.type === "Trailer")[0]);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleShowClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    navigate(
      category === "movie"
        ? `/home/movies/${movie.id}`
        : `/home/tv-series/${movie.id}`
    );
  };

  const handleWatchClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsWatchOpen(true);
    category === "movie" ? getMovieTrailer() : getTvShowTrailer();
  };

  useEffect(() => {
    category === "movie" ? getMovieDetails() : getTvShowDetails();
  }, []);

  return (
    <div
      onClick={handleShowClick}
      className="relative w-full aspect-video sm:aspect-[2/1]  bg-cover rounded-xl cursor-pointer"
    >
      <div className="absolute w-full h-full bg-gradient-to-tr from-black/80 rounded-xl"></div>
      <LazyLoadImage
        src={img_path}
        alt="slider_img"
        className="w-full h-full rounded-xl object-cover"
        loading="lazy"
      />
      <div className="details text-white absolute bottom-0 p-4 sm:p-8 flex flex-col justify-end h-full">
        <h1 className="uppercase text-lg sm:text-xl font-medium">
          {movie.name || movie.title}
        </h1>
        <p className="uppercase text-gray-300 text-xs sm:text-sm my-1">
          {genres?.map((genre: any) => genre.name).join(", ")}
        </p>
        <div className="flex gap-2 mt-2 text-xs sm:text-md">
          <button
            onClick={handleWatchClick}
            className="px-3 py-1 rounded-md bg-red"
          >
            Watch
          </button>

          <SliderItemModal videoId={trailer.key} />

          {/* Add to favorites section -------  */}
          <FavoriteButton id={movie.id} movie={movie} />
        </div>
      </div>
    </div>
  );
}
