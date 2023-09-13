import { categoryState } from "@/stores/store";
import { useEffect } from "react";
import { useMatches, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { twMerge } from "tailwind-merge";

function Header() {
  const [, { pathname }] = useMatches();
  const setCategory = useSetRecoilState(categoryState);
  const navigate = useNavigate();

  const handleTvShowsClick = () => {
    setCategory("tv");
    navigate("/home/tv-series");
  };

  const handleMoviesClick = () => {
    setCategory("movie");
    navigate("/home/movies");
  };

  useEffect(() => {
    if (pathname === "/home/movies") {
      setCategory("movie");
    } else if (pathname === "/home/tv-series") {
      setCategory("tv");
    }
  }, []);

  return (
    <header className="">
      <ul className="flex gap-4 text-gray-light text-sm sm:text-md">
        <li
          onClick={handleTvShowsClick}
          className={twMerge(
            "text-gray-light hover:text-white cursor-pointer",
            pathname === "/home/tv-series" && "text-white"
          )}
        >
          TV Series
        </li>
        <li
          onClick={handleMoviesClick}
          className={twMerge(
            "text-gray-light hover:text-white cursor-pointer",
            pathname === "/home/movies" && "text-white"
          )}
        >
          Movies
        </li>
      </ul>
    </header>
  );
}

export default Header;
