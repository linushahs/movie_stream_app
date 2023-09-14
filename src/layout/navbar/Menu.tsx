import { twMerge } from "tailwind-merge";
import { useMatches } from "react-router-dom";

interface MenuProps {
  menu: { name: string; path: string };
  changeMenuState: (state: string) => void;
  children: React.ReactNode;
}

function Menu({ menu: { name, path }, changeMenuState, children }: MenuProps) {
  const [{ pathname }] = useMatches();

  return (
    <li
      className={twMerge(
        "my-7 flex gap-1 sm:gap-3 items-center justify-center xl:justify-start text-gray-dark  cursor-pointer hover:text-white xl:px-4",
        pathname.startsWith(path) && "xl:border-r-4 xl:border-r-red text-white"
      )}
      onClick={() => changeMenuState(path)}
    >
      {children}
      <a
        href="#"
        className={twMerge(
          "hidden sm:hidden xl:block",
          pathname.startsWith(path) && "block"
        )}
      >
        {name}
      </a>
    </li>
  );
}

export default Menu;
