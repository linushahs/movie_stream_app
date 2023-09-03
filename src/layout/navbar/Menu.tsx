import { FiCompass, FiHome } from "react-icons/fi";
import { MdOutlineHomeWork } from "react-icons/md";
import { RxStopwatch } from "react-icons/rx";

interface MenuProps {
  name: string;
  icon: string;
  isClicked: boolean;
  changeMenuState: (state: string) => void;
}

function Menu({ name, icon, isClicked, changeMenuState }: MenuProps) {
  const icons = {
    FiHome: <FiHome className={isClicked ? "text-xl  text-red" : "text-xl"} />,
    FiCompass: (
      <FiCompass className={isClicked ? "text-xl text-red" : "text-xl"} />
    ),
    MdOutlineHomeWork: (
      <MdOutlineHomeWork
        className={isClicked ? "text-xl text-red" : "text-xl"}
      />
    ),
    RxStopwatch: (
      <RxStopwatch className={isClicked ? "text-xl text-red" : "text-xl"} />
    ),
  };

  const btnStyle = isClicked
    ? "lg:border-r-4 lg:border-r-red my-7 text-white flex justify-center lg:justify-start gap-3 items-center  cursor-pointer hover:text-white"
    : "my-7 flex gap-3 items-center justify-center lg:justify-start text-gray-dark  cursor-pointer hover:text-white";
  return (
    <li className={btnStyle} onClick={() => changeMenuState(name)}>
      {icons[icon]}
      <a href="#" className="hidden sm:hidden lg:block">
        {name}
      </a>
    </li>
  );
}

export default Menu;
