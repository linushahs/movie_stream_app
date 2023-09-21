import { categoryState } from "@/stores/store";
import { useEffect } from "react";
import { useMatches, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { twMerge } from "tailwind-merge";

function RouteHeader() {
  const [{ pathname }] = useMatches();
  const [category, setCategory] = useRecoilState(categoryState);

  const handleTvShowsClick = () => {
    setCategory("tv");
  };

  const handleMoviesClick = () => {
    setCategory("movie");
  };

  useEffect(() => {
    if (pathname.includes("movies")) {
      setCategory("movie");
    } else if (pathname.includes("tv")) {
      setCategory("tv");
    }
  }, [pathname]);

  return (
    <header className="">
      <ul className="flex gap-4  text-gray-light text-sm sm:text-md">
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
