import {
  movieGenreOptions,
  popularMovieOptions,
  popularTvShowOptions,
  searchMoviesOptions,
  searchTvShowsOptions,
} from "@/api/api";
import RouteHeader from "@/layout/RouteHeader";
import Navbar from "@/layout/navbar/Navbar";
import Sidebar from "@/layout/sidebar/Sidebar";
import { categoryState } from "@/stores/store";
import years from "@/stores/yearList";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import Pagination from "../Pagination";
import GenreDropdown from "../dropdowns/GenreDropdown";
import YearDropdown from "../dropdowns/YearDropdown";
import { Toaster } from "../ui/toaster";
import SearchedMoviesContainer from "./SearchedMoviesContainer";

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
  const category = useRecoilValue(categoryState);
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
    if (id === selectedYear) {
      setSelectedYear(null);
      return;
    }
    setSelectedYear(id);
  };

  const fetchFilteredResults = async () => {
    // Call the TMDB API with search query and filter options as parameters
    setIsLoading(true);
    const options =
      category === "movie"
        ? searchMoviesOptions(searchQuery, selectedYear)
        : searchTvShowsOptions(searchQuery, selectedYear);
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

  const getPopularMovies = async () => {
    setIsLoading(true);
    await axios.request(popularMovieOptions).then((res) => {
      setFilteredResults(res.data.results);
      setIsLoading(false);
    });
  };

  const getPopularTvShows = async () => {
    setIsLoading(true);
    await axios.request(popularTvShowOptions).then((res) => {
      setFilteredResults(res.data.results);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getGenreList();
    category === "movie" ? getPopularMovies() : getPopularTvShows();
  }, [category]);

  return (
    <section className="App flex">
      <Navbar />

      <main className="main-container">
        <RouteHeader />

        <div className="flex justify-between items-center">
          <form
            onSubmit={handleFilterClick}
            className="grid grid-cols-1 sm:grid-cols-3 w-full gap-2 text-white pt-4 pb-8 sm:py-8 "
          >
            <div className="w-full">
              <input
                type="text"
                className="w-full text-gray-light px-3 py-2 bg-dark rounded-md"
                placeholder={
                  category === "movie" ? "e.g. avatar" : "e.g. one piece"
                }
                value={searchQuery}
                onChange={handleSearchQueryChange}
              />
            </div>
            {/* Genre list -------------->  */}
            <div className="grid grid-cols-search gap-x-3">
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
            </div>
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
