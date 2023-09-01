import { Suspense, lazy, useState } from "react";
import SearchedMoviesLoading from "./loading/SearchedMoviesLoading";
import Navbar from "./layout/navbar/Navbar";
import Sidebar from "./layout/sidebar/Sidebar";
import MoviesContainer from "./components/MoviesContainer";
import MovieDetails from "./components/MovieDetails";
import { Outlet, useMatches } from "react-router-dom";

const LazySearchedMovies = lazy(
  () => import("@/components/SearchedMoviesContainer")
);

function App() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchString, setSearchString] = useState("");

  const changeSearchState = (str: string) => {
    setSearchString(str);
    setIsSearching(str === "" ? false : true);
  };

  return (
    <div className="App flex">
      <Navbar />

      {/* {isSearching ? (
        <Suspense fallback={<SearchedMoviesLoading />}>
          <LazySearchedMovies searchString={searchString} />
        </Suspense>
      ) : (
        <MovieDetails />
      )} */}

      <Sidebar
        changeSearchState={changeSearchState}
        searchString={searchString}
      />
    </div>
  );
}

export default App;
