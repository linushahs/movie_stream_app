import { useRecoilValue, useSetRecoilState } from "recoil";
import { MovieProps } from "../../components/Movie";
import { categoryState, searchQueryState } from "@/stores/store";
import { useNavigate } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";

function SmallMovieCard({
  id,
  title,
  poster_path,
  rating,
  release_date,
}: MovieProps) {
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
      className="w-full flex gap-3 mb-4 cursor-pointer"
    >
      <div className="w-1/4">
        <img
          src={img_path}
          alt="pic"
          loading="lazy"
          className="aspect-[3/4] rounded-lg "
        />
      </div>
      <div className="flex-1 h-[80px] flex flex-col justify-between">
        <div>
          <h4 className="text-white text-sm">{title}</h4>
          <p className="text-xs mt-1 text-gray-light">{release_date}</p>
        </div>
        <span className="flex items-center gap-1 text-xs text-gray-light">
          {rating} <AiFillStar className="w-4 h-4" />
        </span>
      </div>
    </div>
  );
}

export default SmallMovieCard;
