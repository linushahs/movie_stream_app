import App from "@/App";
import MovieDetails from "@/components/MovieDetails";
import MoviesContainer from "@/components/MoviesContainer";
import TVShowDetails from "@/components/TVshowDetails";
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
        path: "movie/:movieId",
        element: <MovieDetails />,
      },
      {
        path: "tv/:tvId",
        element: <TVShowDetails />,
      },
    ],
  },
]);
