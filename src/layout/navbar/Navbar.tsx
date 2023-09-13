import SignInWithGoogle from "@/components/SignInWithGoogle";
import UserProfile from "@/components/UserProfile";
import { AiOutlineHeart } from "react-icons/ai";
import { FiHome } from "react-icons/fi";
import { RxStopwatch } from "react-icons/rx";
import { useMatches, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Menu from "./Menu";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userDataState } from "@/stores/store";

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
  const [userData, setUserData] = useRecoilState(userDataState);

  const changeMenuState = (path: string) => {
    navigate(path);
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUserData(JSON.parse(user));
    }
  }, []);

  return (
    <div className="navbar">
      <header>
        <div
          className="flex gap-2 justify-center lg:justify-start items-center -mt-1.5 cursor-pointer lg:p-8"
          onClick={() => navigate("/")}
        >
          <img src="/peamon.png" alt="logo" className="w-6 h-6" />
          <h3 className="text-white text-lg lg:text-2xl hidden lg:block ">
            Peamon
          </h3>
        </div>
      </header>
      <div className="menu">
        <h5 className="hidden lg:block text-sm text-center lg:text-left text-gray-light font-bold uppercase">
          Menu
        </h5>
        <ul className=" list-none  ">
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

      <footer className="lg:mt-auto lg:pb-6 lg:px-4 lg:w-full">
        {userData.name ? <UserProfile user={userData} /> : <SignInWithGoogle />}
      </footer>
    </div>
  );
}

export default Navbar;
