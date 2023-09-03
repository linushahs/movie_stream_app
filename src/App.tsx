import { Suspense, lazy, useState, useEffect } from "react";
import SearchedMoviesLoading from "./loading/SearchedMoviesLoading";
import Navbar from "./layout/navbar/Navbar";
import Sidebar from "./layout/sidebar/Sidebar";
import MoviesContainer from "./components/MoviesContainer";
import MovieDetails from "./components/MovieDetails";
import { Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { searchQueryState } from "./stores/store";

const LazySearchedMovies = lazy(
  () => import("@/components/SearchedMoviesContainer")
);

function App() {
  const [isSearching, setIsSearching] = useState(false);
  const searchQuery = useRecoilValue(searchQueryState);

  useEffect(() => {
    setIsSearching(searchQuery === "" ? false : true);
  }, [searchQuery]);

  return (
    <div className="App flex">
      <Navbar />

      {isSearching ? (
        <Suspense fallback={<SearchedMoviesLoading />}>
          <LazySearchedMovies />
        </Suspense>
      ) : (
        <Outlet />
      )}

      <Sidebar />
    </div>
  );
}

export default App;
