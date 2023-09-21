import { twMerge } from "tailwind-merge";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { useEffect, useState } from "react";

interface PaginationProps {
  totalItems: number;
  setPagination: (obj: any) => void;
}

function Pagination({ totalItems, setPagination }: PaginationProps) {
  const [pageNo, setPageNo] = useState(1);
  const btnStyle = {
    nextBtnStyle: totalItems < pageNo * 10 ? "disabled" : "default",
    prevBtnStyle: pageNo <= 1 ? "disabled" : "default",
  };

  const goToNextPage = async () => {
    if (totalItems > pageNo * 10) {
      setPageNo(pageNo + 1);
      return;
    }
  };

  const goToPreviousPage = async () => {
    if (pageNo > 1) {
      setPageNo(pageNo - 1);
      return;
    }
  };

  useEffect(() => {
    setPagination({
      startIndex: (pageNo - 1) * 10,
      endIndex: pageNo * 10,
    });
  }, [pageNo]);

  return (
    <div className="hidden sm:flex justify-end gap-2 text-white">
      <button
        onClick={goToPreviousPage}
        className={twMerge(
          "border border-gray-dark p-2 rounded-full hover:bg-dark",
          btnStyle.prevBtnStyle === "disabled" &&
            "disabled:bg-gray-dark disabled:opacity-50"
        )}
        disabled={btnStyle.prevBtnStyle === "disabled"}
      >
        <HiOutlineChevronLeft className="text-xl" />
      </button>
      <button
        onClick={goToNextPage}
        className={twMerge(
          "border border-gray-dark p-2 rounded-full hover:bg-dark",
          btnStyle.nextBtnStyle === "disabled" &&
            "disabled:bg-gray-dark disabled:opacity-50"
        )}
        disabled={btnStyle.nextBtnStyle === "disabled"}
      >
        <HiOutlineChevronRight className="text-xl" />
      </button>
    </div>
  );
}

export default Pagination;
