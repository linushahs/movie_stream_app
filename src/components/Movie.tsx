import { categoryState, searchQueryState } from "@/stores/store";
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
      className="group min-w-[120px] lg:min-w-[180px] flex-1 h-[280px] rounded-xl relative overflow-hidden cursor-pointer  "
    >
      <LazyLoadImage
        src={img_path}
        alt="image"
        loading="lazy"
        className="w-full h-full rounded-2xl opacity-40 transition-all group-hover:scale-125"
      />
      <button className="absolute top-4 right-4 p-1.5 text-xl text-white transition-colors bg-gray-light/50 hover:bg-gray-light/70 rounded-lg">
        <BiPlus className="text-md" />
      </button>
      <div className="w-fit flex flex-col absolute bottom-4 left-4 gap-1 ">
        <p className=" text-white">{title}</p>
        <p className="text-xs text-gray-light">{releaseDate}</p>
        <p className=" text-sm mt-1 text-white">
          <span className=" bg-yellow px-2 rounded-md text-black font-bold ">
            IMDB
          </span>
          &nbsp; {rating}
        </p>
      </div>
    </div>
  );
}

export default Movie;
