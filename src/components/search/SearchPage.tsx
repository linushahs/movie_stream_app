import { movieGenreOptions, searchMoviesOptions } from "@/api/api";
import RouteHeader from "@/layout/RouteHeader";
import Navbar from "@/layout/navbar/Navbar";
import Sidebar from "@/layout/sidebar/Sidebar";
import years from "@/stores/yearList";
import axios from "axios";
import React, { useEffect, useState } from "react";
import GenreDropdown from "../dropdowns/GenreDropdown";
import YearDropdown from "../dropdowns/YearDropdown";
import { Toaster } from "../ui/toaster";
import SearchedMoviesContainer from "./SearchedMoviesContainer";
import Pagination from "../Pagination";

export interface Genre {
  id: number;
  name: string;
  checked: boolean;
}

export interface Year {
  id: string;
  checked: boolean;
}

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [genreList, setGenreList] = useState<Array<Genre>>([]);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    startIndex: 0,
    endIndex: 10,
  });

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
    const updatedGenres = genreList.map((genre: Genre) => {
      if (genre.id === id) {
        genre.checked = !genre.checked;
      }

      return genre;
    });

    setGenreList([...updatedGenres]);
  };

  const handleYearClick = (id: string) => {
    setSelectedYear(id);
  };

  const fetchFilteredResults = async () => {
    // Call the TMDB API with search query and filter options as parameters
    setIsLoading(true);
    const options = searchMoviesOptions(searchQuery, selectedYear);
    const isGenreChecked = genreList.reduce(
      (acc, curr) => (curr.checked ? acc + 1 : acc),
      0
    );

    await axios
      .request(options)
      .then((res: any) => {
        // Filter movies based on selected genres
        const filteredMovies = res.data.results.filter((movie: any) => {
          return genreList.some((genre) =>
            genre.checked ? movie.genre_ids.includes(genre.id) : false
          );
        });

        setFilteredResults(!isGenreChecked ? res.data.results : filteredMovies);
        setIsLoading(false);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    getGenreList();
  }, []);

  const handleFilterClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchFilteredResults();
    setSearchQuery("");
  };

  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  return (
    <section className="App flex">
      <Navbar />

      <main className="main-container">
        <RouteHeader />

        <div className="flex justify-between items-center">
          <form
            onSubmit={handleFilterClick}
            className="flex gap-2 text-white py-8"
          >
            <input
              type="text"
              className="text-gray-light px-3 py-2 bg-dark rounded-md"
              placeholder="eg. avatar"
              value={searchQuery}
              onChange={handleSearchQueryChange}
            />
            {/* Genre list -------------->  */}
            <GenreDropdown
              label="Genre"
              items={genreList}
              onItemClick={handleGenreClick}
            />

            {/* Year list --------------->  */}
            <YearDropdown
              label="Year"
              years={years}
              selectedYear={selectedYear}
              onYearSelect={handleYearClick}
            />
            {/* Filter Button */}
            <button
              type="submit"
              className="bg-red hover:bg-red/80 text-white py-1 px-4 rounded-md"
            >
              Search
            </button>
          </form>

          <Pagination
            totalItems={filteredResults.length}
            setPagination={setPagination}
          />
        </div>

        <SearchedMoviesContainer
          movies={filteredResults}
          isLoading={isLoading}
          pagination={pagination}
        />
      </main>

      <Sidebar />
      <Toaster />
    </section>
  );
}

export default SearchPage;
