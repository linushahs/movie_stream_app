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
        "my-7 flex gap-3 items-center justify-center lg:justify-start text-gray-dark  cursor-pointer hover:text-white",
        pathname.startsWith(path) && "lg:border-r-4 lg:border-r-red text-white"
      )}
      onClick={() => changeMenuState(path)}
    >
      {children}
      <a
        href="#"
        className={twMerge(
          "hidden sm:hidden lg:block",
          pathname.startsWith(path) && "block"
        )}
      >
        {name}
      </a>
    </li>
  );
}

export default Menu;
