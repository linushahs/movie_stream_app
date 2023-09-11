import SignInWithGoogle from "@/components/SignInWithGoogle";
import UserProfile from "@/components/UserProfile";
import { loggedInUserState } from "@/stores/store";
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
  const [, { pathname }] = useMatches();
  const navigate = useNavigate();
  const loggedInUser = useRecoilValue(loggedInUserState);

  const changeMenuState = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col fixed border-r-[0.5px] border-r-gray-dark/50 transition-all bg-black h-screen w-[80px] lg:w-[250px] xl:w-[260px]">
      <header>
        <div
          className="flex gap-2 justify-center lg:justify-start items-center -mt-1.5 cursor-pointer lg:p-8"
          onClick={() => navigate("/")}
        >
          <img src="/peamon.png" alt="logo" className="w-6 h-6" />
          <h3 className="text-white text-2xl hidden lg:block ">Peamon</h3>
        </div>
      </header>
      <div className="menu mt-4 lg:px-8">
        <h5 className="text-sm text-center lg:text-left text-gray-light font-bold uppercase">
          Menu
        </h5>
        <ul className=" list-none  ">
          {menus.map((menu, id) => (
            <Menu key={id} menu={menu} changeMenuState={changeMenuState}>
              <span
                className={twMerge(
                  menu.path === pathname && "text-red",
                  "text-xl"
                )}
              >
                {menu.icon}
              </span>
            </Menu>
          ))}
        </ul>
      </div>

      <footer className="mt-auto pb-6 px-4 w-full">
        {loggedInUser.name && loggedInUser.profile_path ? (
          <UserProfile user={loggedInUser} />
        ) : (
          <SignInWithGoogle />
        )}
      </footer>
    </div>
  );
}

export default Navbar;
