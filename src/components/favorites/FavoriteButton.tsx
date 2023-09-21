import { getFavoriteMovies, getFavoriteTvShows } from "@/firebase/helpers";
import { firebaseApp } from "@/main";
import {
  categoryState,
  favoriteMoviesState,
  favoriteTvShowState,
  userDataState,
} from "@/stores/store";
import { deleteDoc, doc, getFirestore, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useRecoilState, useRecoilValue } from "recoil";
import { twMerge } from "tailwind-merge";
import { useToast } from "../ui/use-toast";
import { MovieProps } from "../Movie";

interface FavoriteButtonProps {
  id: string;
  movie: any;
}

function FavoriteButton({ id, movie }: FavoriteButtonProps) {
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
    const movieDetails: MovieProps = {
      id: movie.id,
      poster_path: movie.poster_path,
      title: movie.title || movie.name,
      rating: movie.vote_average,
      release_date: movie.release_date || movie.first_air_date,
    };
    await setDoc(doc(db, uid, "favorites", coll, docId), movieDetails).then(
      () => {
        toast({
          title: "Added to favorites",
        });
      }
    );

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

  useEffect(() => {
    const list: any =
      category === "movie"
        ? favoriteMovies.find((m: any) => m.id === parseInt(id))
        : favoriteTvShows.find((m: any) => m.id === parseInt(id));

    list ? setIsAddedToFav(true) : setIsAddedToFav(false);
  }, [favoriteMovies, favoriteTvShows, category]);

  return (
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
  );
}

export default FavoriteButton;
