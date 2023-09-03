import App from "@/App";
import MovieDetails from "@/components/MovieDetails";
import MoviesContainer from "@/components/MoviesContainer";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <MoviesContainer />,
      },
      {
        path: "tv-series",
        element: <MoviesContainer />,
      },
      {
        path: "movie/:showId",
        element: <MovieDetails />,
      },
      {
        path: "tv/:showId",
        element: <MovieDetails />,
      },
    ],
  },
]);
