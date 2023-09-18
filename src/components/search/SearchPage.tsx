import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Header from "@/layout/Header";
import Navbar from "@/layout/navbar/Navbar";
import Sidebar from "@/layout/sidebar/Sidebar";
import { FiChevronDown, FiPlus } from "react-icons/fi";
import { Toaster } from "../ui/toaster";
import { useEffect, useState } from "react";
import { movieGenreOptions } from "@/api/api";
import axios from "axios";
import years, { Year } from "@/stores/yearList";

interface Genre {
  id: number;
  name: string;
  checked: boolean;
}

function SearchPage() {
  const [genreList, setGenreList] = useState<Array<Genre>>([]);
  const [yearList, setYearList] = useState(years);

  const getGenreList = async () => {
    const options = movieGenreOptions();
    await axios
      .request(options)
      .then((res: any) => {
        setGenreList(res.data.genres);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleGenreClick = (id: number) => {
    const genre = genreList.map((genre: Genre) => {
      if (genre.id === id) {
        genre.checked = !genre.checked;
      }
      return genre;
    });

    setGenreList([...genre]);
  };

  useEffect(() => {
    getGenreList();
  }, []);

  return (
    <section className="App flex">
      <Navbar />

      <div className="main-container">
        <Header />

        <div className="flex gap-2 text-white">
          <input type="text" className="" />
          {/* Genre list -------------->  */}
          <DropdownMenu>
            <DropdownMenuTrigger className="bg-dark flex items-center gap-1.5 py-1 px-2 rounded-md">
              Genre <FiChevronDown className="text-lg" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-dark grid grid-cols-3 grid-rows-8">
              {genreList.map((genre: Genre, id) => (
                <DropdownMenuItem
                  key={id}
                  onClick={() => handleGenreClick(genre.id)}
                  className="flex items-center gap-2 cursor-pointer focus:bg-dark/50"
                >
                  {genre.checked ? (
                    <span className="w-4 h-4 flex items-center justify-center rounded-full bg-red text-white text-xs">
                      <FiPlus />
                    </span>
                  ) : (
                    <span className="w-4 h-4 rounded-full bg-gray-dark"></span>
                  )}
                  {genre.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Year list --------------->  */}
          <DropdownMenu>
            <DropdownMenuTrigger className="bg-dark flex items-center gap-1.5 py-1 px-2 rounded-md">
              Year <FiChevronDown className="text-lg" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-dark grid grid-cols-3 grid-rows-8">
              {yearList.map((year: Year, id) => (
                <DropdownMenuItem
                  key={year.id}
                  onClick={() => handleYearClick(year.id)}
                  className="flex items-center gap-2 cursor-pointer focus:bg-dark/50"
                >
                  {year.checked ? (
                    <span className="w-4 h-4 flex items-center justify-center rounded-full bg-red text-white text-xs">
                      <FiPlus />
                    </span>
                  ) : (
                    <span className="w-4 h-4 rounded-full bg-gray-dark"></span>
                  )}
                  {year.id}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* <SearchedMoviesContainer /> */}
      </div>

      <Sidebar />
      <Toaster />
    </section>
  );
}

export default SearchPage;
