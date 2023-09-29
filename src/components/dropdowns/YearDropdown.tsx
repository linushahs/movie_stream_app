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
  const buttonRef = useRef<any>();

  const handleYearSelect = (year: string) => {
    onYearSelect(year);
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
    <div className="relative z-40 ">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-dark w-full flex items-center gap-1.5 py-2 px-3 rounded-md cursor-pointer"
      >
        {label} <FiChevronDown className="text-lg ml-auto" />
      </button>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="w-[320px] sm:w-[380px] h-auto bg-dark grid grid-cols-3 sm:grid-cols-4 grid-rows-6 absolute top-full -left-24 sm:left-0 mt-2 py-2 px-4 rounded-md transition-all"
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
