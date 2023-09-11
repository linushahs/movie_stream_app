import { Suspense, lazy, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Navbar from "./layout/navbar/Navbar";
import Sidebar from "./layout/sidebar/Sidebar";
import SearchedMoviesLoading from "./loading/SearchedMoviesLoading";
import { searchQueryState } from "./stores/store";
import { Toaster } from "./components/ui/toaster";

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
      <Toaster />
      <Sidebar />
    </div>
  );
}

export default App;
