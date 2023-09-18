import SignInWithGoogle from "@/components/SignInWithGoogle";
import UserProfile from "@/components/UserProfile";
import { userDataState } from "@/stores/store";
import { AiOutlineHeart } from "react-icons/ai";
import { FiHome } from "react-icons/fi";
import { RxStopwatch } from "react-icons/rx";
import { useMatches, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { twMerge } from "tailwind-merge";
import Menu from "./Menu";

const menus = [
  {
    name: "Home",
    icon: <FiHome />,
    path: "/home",
  },
  {
    name: "Favorites",
    icon: <AiOutlineHeart />,
    path: "/favorites",
  },
  {
    name: "Upcoming Shows",
    icon: <RxStopwatch />,
    path: "/upcoming",
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
          <h3 className="text-white text-lg xl:text-lg hidden xl:block ">
            Peamon
          </h3>
        </div>
      </header>
      <div className="menu">
        <h5 className="hidden xl:block text-sm text-center xl:text-left xl:px-4 text-gray-light font-bold uppercase">
          Menu
        </h5>
        <ul className=" list-none  xl:text-sm 2xl:text-lg">
          <Menu menu={menus[0]} changeMenuState={changeMenuState}>
            <span
              className={twMerge(
                menus[0].path === pathname && "text-red",
                "text-xl"
              )}
            >
              {menus[0].icon}
            </span>
          </Menu>
          <Menu menu={menus[1]} changeMenuState={changeMenuState}>
            <span
              className={twMerge(
                pathname === "/favorites/movies" && "text-red",
                "text-[22px]"
              )}
            >
              {menus[1].icon}
            </span>
          </Menu>
          <Menu menu={menus[2]} changeMenuState={changeMenuState}>
            <span
              className={twMerge(
                menus[2].path === pathname && "text-red",
                "text-xl"
              )}
            >
              {menus[2].icon}
            </span>
          </Menu>
        </ul>
      </div>

      <footer className="sm:flex sm:justify-center sm:mt-auto sm:pb-6 sm:w-full">
        {userData.name ? <UserProfile user={userData} /> : <SignInWithGoogle />}
      </footer>
    </div>
  );
}

export default Navbar;
