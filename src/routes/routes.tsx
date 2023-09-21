import App from "@/App";
import MovieDetails from "@/components/details/movie/MovieDetails";
import MoviesContainer from "@/components/MoviesContainer";
import TVShowDetails from "@/components/details/tv/TVshowDetails";
import Favorites from "@/components/favorites/Favorites";
import SearchPage from "@/components/search/SearchPage";
import { Navigate, createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home/movies" />,
  },
  {
    path: "/home",
    element: <App />,
    children: [
      {
        path: "",
        element: <Navigate to="/home/movies" />,
      },
      {
        path: "/home/movies",
        element: <MoviesContainer />,
      },
      {
        path: "/home/movies/:movieId",
        element: <MovieDetails />,
      },
      {
        path: "/home/tv-series",
        element: <MoviesContainer />,
      },
      {
        path: "/home/tv-series/:tvId",
        element: <TVShowDetails />,
      },
    ],
  },
  {
    path: "/favorites/movies",
    element: <Favorites />,
  },
  {
    path: "/favorites/tv-series",
    element: <Favorites />,
  },
  {
    path: "/search/movies",
    element: <SearchPage />,
  },
  {
    path: "/search/tv-series",
    element: <SearchPage />,
  },
]);
