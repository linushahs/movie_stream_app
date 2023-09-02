import { categoryState } from "@/stores/store";
import { useRecoilState } from "recoil";
import { twMerge } from "tailwind-merge";
import { useNavigate, useMatches } from "react-router-dom";

function Header() {
  const [category, setCategory] = useRecoilState(categoryState);
  const navigate = useNavigate();
  const [, { pathname }] = useMatches();

  const handleTvShowsClick = () => {
    setCategory("tv");
    navigate("/tv-series");
  };

  const handleMoviesClick = () => {
    setCategory("movie");
    navigate("/");
  };
  return (
    <header className="">
      <ul className="flex gap-4 text-gray-light">
        <li
          onClick={handleTvShowsClick}
          className={twMerge(
            "text-gray-light hover:text-white cursor-pointer",
            pathname === "/tv-series" && "text-white"
          )}
        >
          TV Series
        </li>
        <li
          onClick={handleMoviesClick}
          className={twMerge(
            "text-gray-light hover:text-white cursor-pointer",
            pathname === "/" && "text-white"
          )}
        >
          Movies
        </li>
      </ul>
    </header>
  );
}

export default Header;
