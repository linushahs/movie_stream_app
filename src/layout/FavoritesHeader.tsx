import { categoryState } from "@/stores/store";
import { useEffect } from "react";
import { useMatches, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { twMerge } from "tailwind-merge";

function FavoritesHeader() {
  const [{ pathname }] = useMatches();
  const [category, setCategory] = useRecoilState(categoryState);
  const navigate = useNavigate();

  const handleTvShowsClick = () => {
    setCategory("tv");
    navigate("/favorites/tv-series");
  };

  const handleMoviesClick = () => {
    setCategory("movie");
    navigate("/favorites/movies");
  };

  useEffect(() => {
    if (pathname === "/favorites/movies") {
      setCategory("movie");
    } else if (pathname === "/favorites/tv-series") {
      setCategory("tv");
    }
  }, [pathname]);

  return (
    <header className="">
      <ul className="flex gap-4 text-gray-light">
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

export default FavoritesHeader;