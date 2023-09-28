import { twMerge } from "tailwind-merge";
import { useMatches } from "react-router-dom";

interface MenuProps {
  menu: { name: string; path: string };
  changeMenuState: (state: string) => void;
  children: React.ReactNode;
}

function DropdownNavMenu({
  menu: { name, path },
  changeMenuState,
  children,
}: MenuProps) {
  const [{ pathname }] = useMatches();

  return (
    <li
      className={twMerge(
        "mb-2 flex gap-2 font-medium  items-center justify-center  text-gray-light  cursor-pointer hover:text-white ",
        path.startsWith("/" + pathname.split("/")[1]) &&
          "xl:border-r-4 xl:border-r-red text-white"
      )}
      onClick={() => changeMenuState(path)}
    >
      {children}
      <a
        href="#"
        className={twMerge(
          "",
          path.startsWith("/" + pathname.split("/")[1]) && "block"
        )}
      >
        {name}
      </a>
    </li>
  );
}

export default DropdownNavMenu;
