import { getFavoriteMovies, getFavoriteTvShows } from "@/firebase/helpers";
import { firebaseApp } from "@/main";
import {
  categoryState,
  favoriteMoviesState,
  favoriteTvShowState,
  searchQueryState,
  userDataState,
} from "@/stores/store";
import { deleteDoc, doc, getFirestore, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { AiFillHeart, AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { BiMinus, BiPlus } from "react-icons/bi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { twMerge } from "tailwind-merge";
import { useToast } from "./ui/use-toast";

export interface MovieProps {
  id: number;
  poster_path: string;
  title: string;
  rating: number;
  release_date: string;
}

function Movie({ id, poster_path, title, rating, release_date }: MovieProps) {
  const img_path = `https://image.tmdb.org/t/p/original/${poster_path}`;
  const navigate = useNavigate();
  const category = useRecoilValue(categoryState);
  const setSearchQuery = useSetRecoilState(searchQueryState);
  const [favoriteMovies, setFavoriteMovies] =
    useRecoilState(favoriteMoviesState);
  const [favoriteTvShows, setFavoriteTvShows] =
    useRecoilState(favoriteTvShowState);
  const { uid } = useRecoilValue(userDataState);
  const [isAddedToFav, setIsAddedToFav] = useState(false);
  const { toast } = useToast();

  //firestore database
  const db = getFirestore(firebaseApp);

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
    const docId = category === "tv" ? `tv${id}` : `movie${id}`;
    await setDoc(doc(db, uid, "favorites", coll, docId), {
      id,
      poster_path,
      title,
      rating,
      release_date,
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
    const docId = category === "tv" ? `tv${id}` : `movie${id}`;
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

  const handleNavigation = () => {
    setSearchQuery("");
    navigate(
      category === "movie" ? `/home/movies/${id}` : `/home/tv-series/${id}`
    );
  };

  useEffect(() => {
    const list: any =
      category === "movie"
        ? favoriteMovies.find((m: any) => m.id === id)
        : favoriteTvShows.find((m: any) => m.id === id);

    list ? setIsAddedToFav(true) : setIsAddedToFav(false);
  }, [favoriteMovies, favoriteTvShows, category]);

  return (
    <div
      onClick={handleNavigation}
      className="relative flex flex-col gap-2 cursor-pointer w-full"
    >
      <div className="w-full aspect-[3/4] rounded-lg overflow-hidden">
        <LazyLoadImage
          src={img_path}
          alt="image"
          loading="lazy"
          className="w-full h-full  transition-all hover:scale-[1.15]"
        />
      </div>

      {/* Add to favorites section -------  */}
      <button
        className={twMerge(
          "absolute top-2 right-2 p-1.5 text-xl text-white transition-colors bg-white/40 backdrop-blur-sm hover:bg-gray-light/70 rounded-lg z-30",
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

      {/* description -------------------  */}
      <div className="flex justify-between items-center text-xs sm:text-sm text-gray-light">
        <p>{release_date?.substring(0, 4)}</p>
        <span className="rounded-full border border-gray-600 w-fit px-2">
          {category === "movie" ? "Movie" : "Series"}
        </span>
        <span className="flex items-center gap-1">
          {rating} <AiFillStar className="w-4 h-4" />
        </span>
      </div>
      <p className="w-full text-white">{title}</p>
    </div>
  );
}

export default Movie;
