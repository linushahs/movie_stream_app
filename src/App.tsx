import { useState } from "react";
import Navbar from "./navbar/Navbar";
import SearchedMovies from "./main-container/SearchedMovies";
import Sidebar from "./sidebar/Sidebar";
import Main from "./main-container/Main";

function App() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchString, setSearchString] = useState("");

  const changeSearchState = (str: string) => {
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
