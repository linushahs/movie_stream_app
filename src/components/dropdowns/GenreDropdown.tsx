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
  const dropdownRef = useRef<any>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

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
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative z-50">
      <div
        onClick={toggleDropdown}
        className="bg-dark flex items-center gap-1.5 py-2 px-3 rounded-md cursor-pointer"
      >
        {label} <FiChevronDown className="text-lg" />
      </div>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="w-[420px] bg-dark grid grid-cols-3 grid-rows-8 absolute top-full left-0 mt-2 py-2 px-4 rounded-md"
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
