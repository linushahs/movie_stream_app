import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";

export interface MovieProps {
  id: number;
  poster: string;
  title: string;
  rating: string;
  releaseDate: string;
}

function Movie({ id, poster, title, rating, releaseDate }: MovieProps) {
  const img_path = `https://image.tmdb.org/t/p/original/${poster}`;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/movie/${id}`)}
      className="group min-w-[120px] lg:min-w-[180px] flex-1 h-[280px] rounded-2xl relative overflow-hidden cursor-pointer  "
    >
      <LazyLoadImage
        src={img_path}
        alt="image"
        loading="lazy"
        className="w-full h-full rounded-2xl opacity-50 transition-all group-hover:scale-125"
      />
      <button className="absolute top-4 right-4 py-0.5 px-2.5 text-xl text-white bg-gray-light/70 rounded-lg">
        +
      </button>
      <div className="details w-full flex flex-col gap-1 absolute bottom-6 text-center">
        <h3 className="text-center text-white">{title}</h3>
        <p className="text-xs text-gray-light">{releaseDate}</p>
        <p className="text-sm mt-1 text-white">
          <span className="bg-yellow px-2 rounded-md text-black font-bold ">
            IMDB
          </span>
          &nbsp; {rating}
        </p>
      </div>
    </div>
  );
}

export default Movie;
