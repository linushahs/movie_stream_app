import App from "@/App";
import MovieDetails from "@/components/MovieDetails";
import MoviesContainer from "@/components/MoviesContainer";
import TVShowDetails from "@/components/TVshowDetails";
import Favorites from "@/components/favorites/Favorites";
import { Navigate } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

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
        path: "/home/",
        element: <MoviesContainer />,
      },
      {
        path: "/home/tv-series",
        element: <MoviesContainer />,
      },
      {
        path: "/home/movie/:movieId",
        element: <MovieDetails />,
      },
      {
        path: "/home/tv/:tvId",
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
