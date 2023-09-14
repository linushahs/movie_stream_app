import { movieDetailsOptions, tvShowDetailsOptions } from "@/api/api";
import {
  categoryState,
  favoriteMoviesState,
  favoriteTvShowState,
  userDataState,
} from "@/stores/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { twMerge } from "tailwind-merge";
import { useToast } from "./ui/use-toast";
import { deleteDoc, doc, getFirestore, setDoc } from "firebase/firestore";
import { firebaseApp } from "@/main";
import { getFavoriteMovies, getFavoriteTvShows } from "@/firebase/helpers";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface SliderProps {
  movie: any;
}

export default function Slider({ movie }: SliderProps) {
  const img_path = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  const category = useRecoilValue(categoryState);
  const [favoriteMovies, setFavoriteMovies] =
    useRecoilState(favoriteMoviesState);
  const [favoriteTvShows, setFavoriteTvShows] =
    useRecoilState(favoriteTvShowState);
  const { uid } = useRecoilValue(userDataState);
  const [isAddedToFav, setIsAddedToFav] = useState(false);
  const { toast } = useToast();

  //firestore database
  const db = getFirestore(firebaseApp);

  const getMovieDetails = async () => {
    if (!movie.id) return;
    const options = movieDetailsOptions(movie.id);
    await axios
      .request(options)
      .then((res) => {
        setGenres(res.data.genres);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const getTvShowDetails = async () => {
    if (!movie.id) return;
    const options = tvShowDetailsOptions(movie.id);
    await axios
      .request(options)
      .then((res) => {
        setGenres(res.data.genres);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const addToFavorites = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (!localStorage.getItem("user")) {
      toast({
        title: "Please signin first",
      });
      return;
    }

    setIsAddedToFav(true);
    const coll = category === "tv" ? "tvShows" : "movies";
    const docId = category === "tv" ? `tv${movie.id}` : `movie${movie.id}`;
    await setDoc(doc(db, uid, "favorites", coll, docId), {
      id: movie.id,
      poster_path: movie.poster_path,
      title: movie.title || movie.name,
      rating: movie.vote_average,
      release_date: movie.release_date || movie.first_air_date,
    }).then(() => {
      toast({
        title: "Added to favorites",
      });
    });

    if (category === "movie") {
      await getFavoriteMovies(uid, db).then((res) => setFavoriteMovies(res));
    } else {
      await getFavoriteTvShows(uid, db).then((res) => setFavoriteTvShows(res));
    }
  };

  const removeFromFavorites = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (!localStorage.getItem("user")) return;

    setIsAddedToFav(false);
    const coll = category === "tv" ? "tvShows" : "movies";
    const docId = category === "tv" ? `tv${movie.id}` : `movie${movie.id}`;
    await deleteDoc(doc(db, uid, "favorites", coll, docId)).then(() => {
      toast({
        title: "Removed from favorites",
        variant: "destructive",
      });
    });

    if (category === "movie") {
      await getFavoriteMovies(uid, db).then((res) => setFavoriteMovies(res));
    } else {
      await getFavoriteTvShows(uid, db).then((res) => setFavoriteTvShows(res));
    }
  };

  useEffect(() => {
    category === "movie" ? getMovieDetails() : getTvShowDetails();
  }, []);

  useEffect(() => {
    const list: any =
      category === "movie"
        ? favoriteMovies.find((m: any) => m.id === movie.id)
        : favoriteTvShows.find((m: any) => m.id === movie.id);

    list ? setIsAddedToFav(true) : setIsAddedToFav(false);
  }, [favoriteMovies, favoriteTvShows, category]);

  return (
    <div
      onClick={() =>
        navigate(
          category === "movie"
            ? `/home/movies/${movie.id}`
            : `/home/tv-series/${movie.id}`
        )
      }
      className="relative w-full aspect-video sm:aspect-[2/1]  bg-cover rounded-xl cursor-pointer"
    >
      <div className="absolute w-full h-full bg-gradient-to-tr from-black/80 rounded-xl"></div>
      <LazyLoadImage
        src={img_path}
        alt="slider_img"
        className="w-full h-full rounded-xl object-cover"
        loading="lazy"
      />
      <div className="details text-white absolute bottom-0 p-4 sm:p-8 flex flex-col justify-end h-full">
        <h1 className="uppercase text-lg sm:text-xl font-medium">
          {movie.name || movie.title}
        </h1>
        <p className="uppercase text-gray-300 text-xs sm:text-sm my-1">
          {genres?.map((genre: any) => genre.name).join(", ")}
        </p>
        <div className="flex gap-2 mt-2 text-xs sm:text-md">
          <button className="px-3 py-1 rounded-lg bg-red">Watch</button>
          {/* Add to favorites section -------  */}
          <button
            className={twMerge(
              "p-1.5 text-xl text-white transition-colors bg-white/40 backdrop-blur-sm hover:bg-gray-light/70 rounded-md z-30",
              isAddedToFav && " text-white "
            )}
          >
            {isAddedToFav ? (
              <div onClick={(e) => removeFromFavorites(e)}>
                <AiFillHeart className="text-md text-red" on />
              </div>
            ) : (
              <div onClick={(e) => addToFavorites(e)}>
                <AiOutlineHeart className="text-md" />
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
