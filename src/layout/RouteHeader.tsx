import { categoryState } from "@/stores/store";
import { useRecoilState } from "recoil";
import { twMerge } from "tailwind-merge";

function RouteHeader() {
  const [category, setCategory] = useRecoilState(categoryState);

  const handleTvShowsClick = () => {
    setCategory("tv");
  };

  const handleMoviesClick = () => {
    setCategory("movie");
  };

  return (
    <header className="">
      <ul className="flex gap-4  text-gray-light text-md sm:text-base">
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
  );
}

export default RouteHeader;
