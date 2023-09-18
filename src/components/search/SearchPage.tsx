import Header from "@/layout/Header";
import Navbar from "@/layout/navbar/Navbar";
import Sidebar from "@/layout/sidebar/Sidebar";
import { Toaster } from "../ui/toaster";
import SearchedMoviesContainer from "../SearchedMoviesContainer";

function SearchPage() {
  return (
    <section className="App flex">
      <Navbar />

      <div className="main-container">
        <Header />

        <div className="flex gap-2">
          <input type="text" className="" />
        </div>

        {/* <SearchedMoviesContainer /> */}
      </div>

      <Sidebar />
      <Toaster />
    </section>
  );
}

export default SearchPage;
