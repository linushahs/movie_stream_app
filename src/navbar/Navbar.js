import React, { useState } from "react";
import Menu from "./Menu";
import { FaVideo } from "react-icons/fa";

function Navbar() {
  const [menus, setMenus] = useState([
    {
      name: "Home",
      icon: "FiHome",
      isClicked: true,
    },
    {
      name: "Community",
      icon: "MdOutlineHomeWork",
      isClicked: false,
    },
    {
      name: "Discover",
      icon: "FiCompass",
      isClicked: false,
    },
    {
      name: "Coming Soon",
      icon: "RxStopwatch",
      isClicked: false,
    },
  ]);

  const changeMenuState = (name) => {
    console.log(name);

    const changedMenu = menus.map((menu) => {
      if (menu.name === name) {
        menu.isClicked = !menu.isClicked;
        return { ...menu, isClicked: menu.isClicked };
      } else {
        menu.isClicked = false;
        return { ...menu, isClicked: menu.isClicked };
      }
    });

    setMenus(changedMenu);
  };

  return (
    <div className="p-2 pt-8 lg:p-8 fixed border-r-[0.5px] border-r-gray-dark/50 transition-all bg-black h-screen w-[80px] lg:w-[250px] xl:w-[280px]">
      <header>
        <div className="flex gap-2 justify-center lg:justify-start items-center">
          <FaVideo className="text-red text-2xl" />
          <h3 className="text-white text-xl hidden lg:block ">Peamon</h3>
        </div>
      </header>
      <div className="menu mt-8">
        <h5 className="text-sm text-center lg:text-left text-gray-light font-bold uppercase">
          Menu
        </h5>
        <ul className=" list-none pt-4 ">
          {menus.map((menu, id) => (
            <Menu
              key={id}
              name={menu.name}
              icon={menu.icon}
              isClicked={menu.isClicked}
              changeMenuState={changeMenuState}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
