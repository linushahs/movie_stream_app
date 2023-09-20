import { Year } from "@/stores/yearList";
import React, { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiPlus } from "react-icons/fi";

interface YearDropdownProps {
  label: string;
  years: Year[];
  selectedYear: string | null;
  onYearSelect: (year: string) => void;
}

const YearDropdown: React.FC<YearDropdownProps> = ({
  label,
  years,
  selectedYear,
  onYearSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<any>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleYearSelect = (year: string) => {
    onYearSelect(year);
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
        className="bg-dark flex items-center gap-1.5 py-1 px-2 rounded-md cursor-pointer"
      >
        {label} <FiChevronDown className="text-lg" />
      </div>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="w-[380px] h-auto bg-dark grid grid-cols-4 grid-rows-6 absolute top-full left-0 mt-2 py-2 px-4 rounded-md"
        >
          {years.map((year, index) => (
            <div
              key={index}
              onClick={() => handleYearSelect(year.id)}
              className="flex items-center gap-2 py-1 cursor-pointer focus:bg-dark/50"
            >
              {year.id === selectedYear ? (
                <span className="w-4 h-4 flex items-center justify-center rounded-full bg-red text-white text-xs">
                  <FiPlus />
                </span>
              ) : (
                <span className="w-4 h-4 rounded-full bg-gray-dark"></span>
              )}
              {year.id}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YearDropdown;
