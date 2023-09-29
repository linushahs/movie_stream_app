import React, { useEffect, useState, useRef } from "react";
import { Genre } from "../search/SearchPage";
import { FiChevronDown, FiPlus } from "react-icons/fi";

interface DropdownProps {
  label: string;
  items: Genre[];
  onItemClick: (id: number) => void;
}

const GenreDropdown: React.FC<DropdownProps> = ({
  label,
  items,
  onItemClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<any>();
  const buttonRef = useRef<any>();

  const handleItemClick = (
    e: React.MouseEvent<HTMLDivElement>,
    item: number
  ) => {
    e.stopPropagation();
    onItemClick(item);
  };

  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (
        !buttonRef.current.contains(event.target) &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative z-40 w-full">
      <button
        type="button"
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-dark flex items-center gap-1.5 py-2 px-3 rounded-md cursor-pointer"
      >
        {label} <FiChevronDown className="text-lg ml-auto" />
      </button>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="w-[calc(100vw-42px)] sm:w-[460px] bg-dark grid grid-cols-2 sm:grid-cols-3 grid-rows-8 absolute top-full left-0 mt-2 py-2 px-4 rounded-md transition-all"
        >
          {items.map((item, index) => (
            <div
              key={index}
              onClick={(e) => handleItemClick(e, item.id)}
              className="flex items-center gap-2 py-1 cursor-pointer focus:bg-dark/50"
            >
              {item.checked ? (
                <span className="w-4 h-4 flex items-center justify-center rounded-full bg-red text-white text-xs">
                  <FiPlus />
                </span>
              ) : (
                <span className="w-4 h-4 rounded-full bg-gray-dark"></span>
              )}
              {item.name || item.id}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GenreDropdown;
