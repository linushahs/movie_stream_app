import { Suspense, lazy, useState } from "react";
import Main from "./main-container/Main";
import SearchedMoviesLoading from "./main-container/loading/SearchedMoviesLoading";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";

const LazySearchedMovies = lazy(
  () => import("./main-container/SearchedMovies")
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
      {isSearching ? (
        <Suspense fallback={<SearchedMoviesLoading />}>
          <LazySearchedMovies searchString={searchString} />
        </Suspense>
      ) : (
        <Main />
      )}

      <Sidebar
        changeSearchState={changeSearchState}
        searchString={searchString}
      />
    </div>
  );
}

export default App;
