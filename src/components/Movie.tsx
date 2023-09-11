import { useState, useEffect } from "react";
import { firebaseApp } from "@/main";
import {
  categoryState,
  favoriteMoviesState,
  searchQueryState,
} from "@/stores/store";
import { deleteDoc, doc, getFirestore, setDoc } from "firebase/firestore";
import { AiFillStar } from "react-icons/ai";
import { BiMinus, BiPlus } from "react-icons/bi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useToast } from "./ui/use-toast";
import { twMerge } from "tailwind-merge";
import { getFavoriteMovies } from "@/firebase/helpers";

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
  const [isAddedToFav, setIsAddedToFav] = useState(false);
  const { toast } = useToast();

  //firestore database
  const db = getFirestore(firebaseApp);

  const addToFavorites = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setIsAddedToFav(true);
    await setDoc(doc(db, "favorite(movies)", `movie${id}`), {
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
  };

  const removeFromFavorites = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setIsAddedToFav(false);

    await deleteDoc(doc(db, "favorite(movies)", `movie${id}`)).then(() => {
      toast({
        title: "Removed from favorites",
        variant: "destructive",
      });
    });

    await getFavoriteMovies(db).then((res) => setFavoriteMovies(res));
  };

  const handleNavigation = () => {
    setSearchQuery("");
    navigate(
      category === "movie" ? `/home/movies/${id}` : `/home/tv-series/${id}`
    );
  };

  useEffect(() => {
    const list: any = favoriteMovies.find((m: any) => m.id === id);
    if (list) setIsAddedToFav(true);
  }, []);

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
          "absolute top-2 right-2 p-1.5 text-xl text-white transition-colors bg-gray-light/50 hover:bg-gray-light/70 rounded-lg z-30",
          isAddedToFav && "bg-red/90 text-white hover:bg-red/80"
        )}
      >
        {isAddedToFav ? (
          <div onClick={(e) => removeFromFavorites(e)}>
            <BiMinus className="text-md" on />
          </div>
        ) : (
          <div onClick={(e) => addToFavorites(e)}>
            <BiPlus className="text-md" />
          </div>
        )}
      </button>

      {/* description -------------------  */}
      <div className="flex justify-between items-center text-sm text-gray-light">
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
