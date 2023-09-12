import App from "@/App";
import MovieDetails from "@/components/MovieDetails";
import MoviesContainer from "@/components/MoviesContainer";
import TVShowDetails from "@/components/TVshowDetails";
import Favorites from "@/components/favorites/Favorites";
import { Navigate, createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" />,
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
    path: "/favorites",
    element: <Favorites />,
    children: [
      {
        path: "/favorites/movies",
        element: <Favorites />,
      },
      {
        path: "/favorites/tv-series",
        element: <Favorites />,
      },
    ],
  },
]);
