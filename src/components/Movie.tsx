import { categoryState, searchQueryState } from "@/stores/store";
import { AiFillStar } from "react-icons/ai";
import { BiPlus } from "react-icons/bi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

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
  const category = useRecoilValue(categoryState);
  const setSearchQuery = useSetRecoilState(searchQueryState);

  const handleNavigation = () => {
    setSearchQuery("");
    navigate(category === "movie" ? `/movie/${id}` : `/tv/${id}`);
  };

  return (
    <div
      onClick={handleNavigation}
      className="relative flex flex-col gap-2 cursor-pointer w-full"
    >
      <LazyLoadImage
        src={img_path}
        alt="image"
        loading="lazy"
        className="w-full aspect-[2/3] rounded-xl transition-all "
      />
      <button className="absolute top-2 right-2 p-1.5 text-xl text-white transition-colors bg-gray-light/50 hover:bg-gray-light/70 rounded-lg z-30">
        <BiPlus className="text-md" />
      </button>
      <div className="flex justify-between items-center">
        <p className="flex-1 text-sm text-gray-light">
          {releaseDate.substring(0, 4)}
        </p>
        <span className="flex items-center gap-1 text-sm">
          {rating} <AiFillStar className="w-4 h-4 text-yellow" />
        </span>
      </div>
      <p className="w-full text-white">{title}</p>
    </div>
  );
}

export default Movie;
