import RouteHeader from "@/layout/RouteHeader";
import Navbar from "@/layout/navbar/Navbar";
import Pagination from "../Pagination";
import { Toaster } from "../ui/toaster";
import { useEffect, useState } from "react";
import TopRatedContainer from "./TopRatedContainer";
import { useRecoilValue } from "recoil";
import { categoryState } from "@/stores/store";
import axios from "axios";
import { topRatedMovieOptions, topRatedTvShowOptions } from "@/api/api";
import Sidebar from "@/layout/sidebar/Sidebar";

function TopRatedPage() {
  const category = useRecoilValue(categoryState);
  const [topRatedShows, setTopRatedShows] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    startIndex: 0,
    endIndex: 10,
  });

  const getTopRatedMovies = async (pageNo: number) => {
    setIsLoading(true);
    const options = topRatedMovieOptions(pageNo);
    await axios.request(options).then((res) => {
      setTopRatedShows(res.data.results);
      setIsLoading(false);
    });
  };

  const getTopRatedTvShows = async () => {
    setIsLoading(true);
    await axios.request(topRatedTvShowOptions).then((res) => {
      setTopRatedShows(res.data.results);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    category === "movie" ? getTopRatedMovies(1) : getTopRatedTvShows();
  }, [category, pagination]);

  return (
    <section className="App flex">
      <Navbar />

      <main className="main-container">
        <div className="flex justify-between mb-6">
          <RouteHeader />

          <Pagination
            totalItems={topRatedShows.length}
            setPagination={setPagination}
          />
        </div>

        <TopRatedContainer
          movies={topRatedShows}
          isLoading={isLoading}
          pagination={pagination}
        />
      </main>

      <Sidebar />
      <Toaster />
    </section>
  );
}

export default TopRatedPage;
