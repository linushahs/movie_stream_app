import { categoryState, searchQueryState } from "@/stores/store";
import { AiFillStar } from "react-icons/ai";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import FavoriteButton from "./favorites/FavoriteButton";

export interface MovieProps {
  id: number;
  poster_path: string;
  title: string;
  rating: number;
  release_date: string;
}

function Movie({ id, poster_path, title, rating, release_date }: MovieProps) {
  const img_path = `https://image.tmdb.org/t/p/original/${poster_path}`;
  const navigate = useNavigate();
  const category = useRecoilValue(categoryState);
  const setSearchQuery = useSetRecoilState(searchQueryState);

  const handleNavigation = () => {
    setSearchQuery("");
    navigate(
      category === "movie" ? `/home/movies/${id}` : `/home/tv-series/${id}`
    );
  };

  return (
    <div
      onClick={handleNavigation}
      className="relative flex flex-col gap-2 cursor-pointer w-full"
    >
      <div className="w-full aspect-[3/4] rounded-lg overflow-hidden">
        <LazyLoadImage
          src={img_path}
          alt="image"
          loading="lazy"
          className="w-full h-full  transition-all hover:scale-[1.15]"
        />
      </div>

      {/* Add to favorites section -------  */}

      <div className="absolute top-2 right-2">
        <FavoriteButton
          id={id + ""}
          movie={{ id, poster_path, title, vote_average: rating, release_date }}
        />
      </div>

      {/* description -------------------  */}
      <div className="flex justify-between items-center text-xs xl:text-sm text-gray-light">
        <p>{release_date?.substring(0, 4)}</p>
        <span className="rounded-full border border-gray-600 w-fit px-2">
          {category === "movie" ? "Movie" : "Series"}
        </span>
        <span className="flex items-center gap-1">
          {rating} <AiFillStar className="w-4 h-4" />
        </span>
      </div>
      <p className="w-full text-white">{title}</p>
    </div>
  );
}

export default Movie;
