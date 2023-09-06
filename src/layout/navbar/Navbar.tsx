import { FiCompass, FiHome } from "react-icons/fi";
import { RxStopwatch } from "react-icons/rx";
import { useMatches, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Menu from "./Menu";

const menus = [
  {
    name: "Home",
    icon: <FiHome />,
    path: "/",
  },
  {
    name: "Discover",
    icon: <FiCompass />,
    path: "/discover",
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

  const changeMenuState = (path: string) => {
    navigate(path);
  };

  return (
    <div className="p-2 pt-8 lg:p-8 fixed border-r-[0.5px] border-r-gray-dark/50 transition-all bg-black h-screen w-[80px] lg:w-[250px] xl:w-[260px]">
      <header>
        <div
          className="flex gap-2 justify-center lg:justify-start items-center -mt-1.5 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src="/peamon.png" alt="logo" className="w-6 h-6" />
          <h3 className="text-white text-2xl hidden lg:block ">Peamon</h3>
        </div>
      </header>
      <div className="menu mt-8">
        <h5 className="text-sm text-center lg:text-left text-gray-light font-bold uppercase">
          Menu
        </h5>
        <ul className=" list-none pt-4 ">
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
    </div>
  );
}

export default Navbar;
