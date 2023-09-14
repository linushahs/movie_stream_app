import { movieDetailsOptions, tvShowDetailsOptions } from "@/api/api";
import { categoryState } from "@/stores/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import FavoriteButton from "./favorites/FavoriteButton";

interface SliderProps {
  movie: any;
}

export default function Slider({ movie }: SliderProps) {
  const img_path = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  const category = useRecoilValue(categoryState);

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

  useEffect(() => {
    category === "movie" ? getMovieDetails() : getTvShowDetails();
  }, []);

  return (
    <div
      onClick={() =>
        navigate(
          category === "movie"
            ? `/home/movies/${movie.id}`
            : `/home/tv-series/${movie.id}`
        )
      }
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
          <button className="px-3 py-1 rounded-lg bg-red">Watch</button>
          {/* Add to favorites section -------  */}
          <FavoriteButton id={movie.id} movie={movie} />
        </div>
      </div>
    </div>
  );
}
