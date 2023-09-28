import SignInWithGoogle from "@/components/auth/SignInWithGoogle";
import UserProfile from "@/components/auth/UserProfile";
import { userDataState } from "@/stores/store";
import { AiOutlineHeart, AiOutlineStar } from "react-icons/ai";
import { FiHome, FiSearch } from "react-icons/fi";
import { FaBarsStaggered } from "react-icons/fa6";
import { useMatches, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { twMerge } from "tailwind-merge";
import Menu from "./Menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const menus = [
  {
    name: "Home",
    icon: <FiHome />,
    path: "/home/movies",
  },
  {
    name: "Search",
    icon: <FiSearch />,
    path: "/search/movies",
  },
  {
    name: "Favorites",
    icon: <AiOutlineHeart />,
    path: "/favorites/movies",
  },
  {
    name: "Top Rated Shows",
    icon: <AiOutlineStar />,
    path: "/top-rated/movies",
  },
];
function Navbar() {
  const [{ pathname }] = useMatches();
  const navigate = useNavigate();
  const userData = useRecoilValue(userDataState);

  const changeMenuState = (path: string) => {
    navigate(path);
  };

  return (
    <div className="navbar">
      <header>
        <div
          className="flex gap-2 justify-center xl:justify-start items-center xl:-mt-1.5 cursor-pointer xl:px-4 xl:pb-6 sm:pt-8"
          onClick={() => navigate("/")}
        >
          <img
            src="/peamon.png"
            alt="logo"
            className="w-6 h-6 sm:w-7 sm:h-7 xl:w-6 xl:h-6"
          />
          <h3 className="text-white text-lg xl:text-lg sm:hidden xl:block ">
            MovieStream
          </h3>
        </div>
      </header>
      <div className="menu">
        <h5 className="hidden xl:block text-sm text-center xl:text-left xl:px-4 text-gray-light font-bold uppercase">
          Menu
        </h5>
        <ul className=" list-none xl:text-sm 2xl:text-lg">
          {menus.map((menu, id) => (
            <Menu key={id} menu={menu} changeMenuState={changeMenuState}>
              <span
                className={twMerge(
                  menu.path.startsWith("/" + pathname.split("/")[1]) &&
                    "text-red",
                  "text-xl"
                )}
              >
                {menu.icon}
              </span>
            </Menu>
          ))}
        </ul>
      </div>

      <footer className="flex items-center sm:justify-center sm:w-full sm:mt-auto sm:pb-6 ">
        {userData.name ? <UserProfile user={userData} /> : <SignInWithGoogle />}

        <DropdownMenu>
          <DropdownMenuTrigger className="sm:hidden ml-4">
            <FaBarsStaggered className=" text-[25px] text-white cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="text-sm">Menu</DropdownMenuLabel>
            <DropdownMenuItem className="flex flex-col">
              {menus.map((menu, id) => (
                <Menu key={id} menu={menu} changeMenuState={changeMenuState}>
                  <span
                    className={twMerge(
                      menu.path.startsWith("/" + pathname.split("/")[1]) &&
                        "text-red",
                      "text-xl"
                    )}
                  >
                    {menu.icon}
                  </span>
                </Menu>
              ))}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </footer>
    </div>
  );
}

export default Navbar;
