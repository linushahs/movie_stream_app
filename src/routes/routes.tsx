import App from "@/App";
import MoviesContainer from "@/components/MoviesContainer";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "movies",
        element: <MoviesContainer />,
      },
      {
        path: "tv-series",
        element: <MoviesContainer />,
      },
    ],
  },
]);
