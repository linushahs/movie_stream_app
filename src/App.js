import { useState, useEffect } from "react";
import Navbar from "./navbar/Navbar";
import Main from "./main-container/Main";
import Sidebar from "./sidebar/Sidebar";
import SearchedMovies from "./main-container/SearchedMovies";

function App() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchString, setSearchString] = useState("");

  const changeSearchState = (str) => {
    setIsSearching(str === "" ? false : true);
    setSearchString(str);
  };
  return (
    <div className="App flex">
      <Navbar />
      {isSearching ? <SearchedMovies searchString={searchString} /> : <Main />}

      <Sidebar
        changeSearchState={changeSearchState}
        searchString={searchString}
      />
    </div>
  );
}

export default App;
