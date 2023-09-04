import { movieDetailsOptions } from "@/api/api";
import axios from "axios";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

interface SliderProps {
  movie: any;
}

export default function Slider({ movie }: SliderProps) {
  const img_path = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);

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

  useEffect(() => {
    getMovieDetails();
  }, []);

  return (
    <div
      onClick={() => navigate(`/movie/${movie.id}`)}
      className="relative w-full h-auto bg-cover rounded-xl cursor-pointer"
    >
      <img
        src={img_path}
        alt="slider_img"
        className="min-w-full h-[500px] rounded-2xl opacity-60 object-cover"
        loading="lazy"
      />
      <div className="details text-white absolute bottom-0 p-8 flex flex-col justify-end h-full">
        <h1 className="uppercase text-xl font-medium">
          {movie.name || movie.title}
        </h1>
        <p className="uppercase text-gray-300 text-sm my-1">
          {genres?.map((genre: any) => genre.name).join(", ")}
        </p>
        <div className="flex gap-2 mt-2">
          <button className="px-4 py-1 rounded-lg bg-red">Watch</button>
          <button className="transition-colors bg-gray-light/50 hover:bg-gray-light/70 p-1.5 py-1.5 rounded-lg">
            <BiPlus className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
}
