import { movieGenreOptions, searchMoviesOptions } from "@/api/api";
import Header from "@/layout/Header";
import Navbar from "@/layout/navbar/Navbar";
import Sidebar from "@/layout/sidebar/Sidebar";
import years from "@/stores/yearList";
import axios from "axios";
import React, { useEffect, useState } from "react";
import GenreDropdown from "../dropdowns/GenreDropdown";
import YearDropdown from "../dropdowns/YearDropdown";
import { Toaster } from "../ui/toaster";
import SearchedMoviesContainer from "../SearchedMoviesContainer";
import { useSearchParams } from "react-router-dom";

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
  const [filterApplied, setFilterApplied] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

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
    const options = searchMoviesOptions(searchQuery, selectedYear);

    await axios
      .request(options)
      .then((res: any) => {
        // Filter movies based on selected genres
        const filteredMovies = res.data.results.filter((movie: any) => {
          return genreList.some((genre) =>
            genre.checked ? movie.genre_ids.includes(genre.id) : true
          );
        });

        setFilteredResults(filteredMovies);
        setFilterApplied(true); // Set filter applied to true
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    getGenreList();
  }, []);

  const handleFilterClick = () => {
    fetchFilteredResults();
  };

  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  return (
    <section className="App flex">
      <Navbar />

      <div className="main-container">
        <Header />

        <div className="flex gap-2 text-white">
          <input
            type="text"
            className="text-black"
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
            className="bg-blue-500 text-white py-1 px-3 rounded-md"
            onClick={handleFilterClick}
          >
            Filter
          </button>
        </div>

        {/* Display filtered results */}
        {/* {filterApplied && (
          <div className="text-white mt-4">
            {/* Display filtered results here 
            {filteredResults.map((result, index) => (
              <div key={index}>{result.title}</div>
            ))}
          </div>
        )} */}

        <SearchedMoviesContainer movies={filteredResults} />
      </div>

      <Sidebar />
      <Toaster />
    </section>
  );
}

export default SearchPage;
