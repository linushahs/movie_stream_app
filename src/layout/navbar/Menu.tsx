interface MenuProps {
  name: string;
  isClicked: boolean;
  changeMenuState: (state: string) => void;
  children: React.ReactNode;
}

function Menu({ name, isClicked, changeMenuState, children }: MenuProps) {
  const btnStyle = isClicked
    ? "lg:border-r-4 lg:border-r-red my-7 text-white flex justify-center lg:justify-start gap-3 items-center  cursor-pointer hover:text-white"
    : "my-7 flex gap-3 items-center justify-center lg:justify-start text-gray-dark  cursor-pointer hover:text-white";
  return (
    <li className={btnStyle} onClick={() => changeMenuState(name)}>
      {children}
      <a href="#" className="hidden sm:hidden lg:block">
        {name}
      </a>
    </li>
  );
}

export default Menu;
