import {
  ageRatingOptions,
  movieDetailsOptions,
  movieTrailersOptions,
  movieWatchProviderOptions,
  similarMoviesOptions,
} from "@/api/api";
import MovieDetailsLoading from "@/loading/MovieDetailsLoading";
import MoviesLoading from "@/loading/MoviesLoading";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate, useParams } from "react-router-dom";
import CastItem from "../CastItem";
import Movie from "../../Movie";
import VideoPlayer from "../../VideoPlayer";
import FavoriteButton from "../../favorites/FavoriteButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import WatchProvider from "../WatchProvider";

function MovieDetails() {
  const [movieDetails, setMovieDetails] = useState<any>({});
  const [similarMovies, setSimilarMovies] = useState([]);
  const [trailers, setTrailers] = useState<any>([]);
  const [currentTrailer, setCurrentTrailer] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSimilarMoviesLoading, setSimilarMoviesLoading] = useState(true);
  const [duration, setDuration] = useState("");
  const [ageRating, setAgeRating] = useState("");
  const [starringCast, setStarringCast] = useState([]);
  const [topCast, setTopCast] = useState([]);
  const [director, setDirector] = useState<any>([]);
  const [watchProviders, setWatchProviders] = useState<any>({});
  const { movieId } = useParams();
  const navigate = useNavigate();

  const getMovieDetails = async () => {
    if (!movieId) return;

    setIsLoading(true);
    const options = movieDetailsOptions(movieId);
    await axios
      .request(options)
      .then((res) => {
        setMovieDetails(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const getAgeRating = async () => {
    if (!movieId) return;

    setIsLoading(true);
    const options = ageRatingOptions(movieId);
    await axios
      .request(options)
      .then((res) => {
        const results = res.data.results;
        const [USRating] = results.filter(
          (obj: any) => obj["iso_3166_1"] === "US"
        );

        if (USRating && USRating.release_dates) {
          setAgeRating(USRating.release_dates[0].certification);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const getSimilarMovies = async () => {
    if (!movieId) return;

    setSimilarMoviesLoading(true);
    const options = similarMoviesOptions(movieId);
    await axios
      .request(options)
      .then((res) => {
        const results = res.data.results;
        if (results) {
          setSimilarMovies(results.filter((_: any, id: number) => id < 5));
        }
        setSimilarMoviesLoading(false);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const getMovieTrailers = async () => {
    if (!movieId) return;

    const options = movieTrailersOptions(movieId);
    await axios
      .request(options)
      .then((res) => {
        const results = res.data.results;
        if (results) {
          setTrailers(results.filter((t: any) => t.type === "Trailer"));
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const getMovieWatchProviders = async () => {
    if (!movieId) return;

    const options = movieWatchProviderOptions(movieId);
    await axios
      .request(options)
      .then((res) => {
        const results = res.data.results;
        if (results) {
          setWatchProviders(results["US"]);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const goToNextTrailer = () => {
    if (currentTrailer >= trailers.length - 1) {
      setCurrentTrailer(0);
      return;
    }
    setCurrentTrailer(currentTrailer + 1);
  };

  const goToPrevTrailer = () => {
    if (currentTrailer <= 0) {
      setCurrentTrailer(trailers.length - 1);
      return;
    }
    setCurrentTrailer(currentTrailer - 1);
  };

  useEffect(() => {
    getMovieDetails();
    getAgeRating();
    getSimilarMovies();
    getMovieTrailers();
    getMovieWatchProviders();
  }, [movieId]);

  useEffect(() => {
    //movie duration
    const runtime = parseInt(movieDetails.runtime);
    const hour = Math.floor(runtime / 60);
    const minute = runtime - hour * 60;
    setDuration(`${hour}hr ${minute}min`);

    //starring cast and director
    if (movieDetails.credits) {
      const cast: any = movieDetails.credits.cast.filter(
        (_: any, id: number) => id < 3
      );
      const directors = movieDetails.credits.crew.filter(
        (crew: any) => crew.job === "Director"
      );
      setStarringCast(cast);
      setDirector(directors.filter((_: any, id: number) => id < 2));
    }

    //top cast
    if (movieDetails.credits) {
      const cast: any = movieDetails.credits.cast.filter(
        (_: any, id: number) => id < 8
      );
      setTopCast(cast);
    }
  }, [movieDetails]);

  console.log(watchProviders);

  if (isLoading) return <MovieDetailsLoading />;

  return (
    <main className="main-container">
      <button
        onClick={() => navigate(-1)}
        className="hidden sm:flex gap-1 items-center border-2 border-gray-600 rounded-full py-1 px-2 text-sm text-gray-light cursor-pointer mb-4 sm:mb-6"
      >
        <BiArrowBack className="text-lg" />
        Back
      </button>

      {/* Details section ------------>  */}
      <div className="dark text-white flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
        <LazyLoadImage
          src={`https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`}
          alt="poster"
          width={320}
          className="hidden sm:block rounded-xl aspect-[2/3]"
          loading="lazy"
        />
        <LazyLoadImage
          src={`https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`}
          alt="poster"
          width={320}
          className="w-full rounded-xl aspect-video sm:hidden"
          loading="lazy"
        />

        <article className="w-full">
          <h2 className="flex items-center text-2xl sm:text-3xl">
            {movieDetails.name || movieDetails.title}
            <span className="inline-flex items-center gap-1 text-sm ml-2 px-2 py-1 bg-dark rounded-md font-medium">
              {movieDetails.vote_average?.toFixed(1)}{" "}
              <AiFillStar className="w-4 h-4 text-yellow" />
            </span>
          </h2>

          <div className="flex gap-3 items-center my-2">
            <ul className=" w-fit flex items-center divide-x divide-gray-dark text-sm sm:text-md text-gray-dark font-medium">
              <li className="pr-2">
                {movieDetails.release_date?.substring(0, 4)}
              </li>
              <li className="px-2">{duration}</li>
              <li className="pl-2">{ageRating}</li>
            </ul>

            {/* add to favorites button -------->  */}
            <FavoriteButton id={movieId as string} movie={movieDetails} />
          </div>

          {/* tabs section ----------->  */}
          {/* Overview , cast tabs ---------> */}
          <Tabs defaultValue="overview" className="tabs w-full mt-6 sm:mt-8">
            <TabsList className="w-[calc(100vw-42px)] sm:w-[400px] h-auto">
              <TabsTrigger value="overview" className="text-base flex-1">
                Overview
              </TabsTrigger>
              <TabsTrigger value="cast" className="text-base flex-1">
                Cast
              </TabsTrigger>
              <TabsTrigger value="trailers" className="text-base flex-1">
                Trailers
              </TabsTrigger>
              <TabsTrigger value="watch" className="text-base flex-1">
                Watch
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <div className="w-full">
                <p className="text-gray-light pt-2">{movieDetails.overview}</p>
                <ul className="mt-6">
                  <li className="flex items-start gap-2 sm:gap-0 sm:items-center">
                    <strong className="sm:w-[130px] text-gray-dark">
                      Starring:
                    </strong>
                    <p>
                      {starringCast.map((cast: any) => cast.name).join(", ")}
                    </p>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-0 sm:items-center mt-2">
                    <strong className="sm:w-[130px] text-gray-dark">
                      Directed by:
                    </strong>
                    <p>{director.map((d: any) => d.name).join(", ")}</p>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-0 sm:items-center mt-2">
                    <strong className="sm:w-[130px] text-gray-dark">
                      Genre:
                    </strong>
                    <p>
                      {movieDetails.genres
                        ?.map((genre: any) => genre.name)
                        .join(", ")}
                    </p>
                  </li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="cast">
              <div className="mt-4 grid grid-cols-3 gap-x-10">
                {director.length &&
                  director.map((d: any) => (
                    <CastItem
                      key={d.id}
                      name={d.name || ""}
                      role={d.job}
                      profile_path={d.profile_path}
                      clip_string={false}
                    />
                  ))}
              </div>
              <h2 className="text-lg font-medium text-gray-light mt-4">
                Top Cast
              </h2>

              {/* Top cast slider with navigation ---------->  */}
              <div className="min-w-full grid grid-cols-3  gap-x-2 gap-y-6  mt-4">
                {topCast.length &&
                  topCast.map((t: any) => (
                    <CastItem
                      key={t.id}
                      name={t.name || t.original_name}
                      role={t.character}
                      profile_path={t.profile_path}
                      className="w-full"
                    />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="trailers">
              {trailers[currentTrailer] && (
                <>
                  <VideoPlayer videoId={trailers[currentTrailer].key} />

                  <div className="flex justify-end gap-2 mt-3">
                    <button
                      onClick={goToPrevTrailer}
                      className="border border-gray-700 p-2 rounded-full hover:bg-dark"
                    >
                      <HiOutlineChevronLeft className="text-lg sm:text-xl" />
                    </button>
                    <button
                      onClick={goToNextTrailer}
                      className="border border-gray-700 p-2 rounded-full hover:bg-dark"
                    >
                      <HiOutlineChevronRight className="text-lg sm:text-xl" />
                    </button>
                  </div>
                </>
              )}
            </TabsContent>
            <TabsContent value="watch">
              {watchProviders ? (
                <WatchProvider watchProviders={watchProviders} />
              ) : (
                <button
                  className="w-fit flex gap-2 items-center text-sm bg-dark rounded-md py-2 px-3 cursor-pointer mt-4"
                  aria-disabled={true}
                  disabled={true}
                >
                  Watch in theatres...
                </button>
              )}
            </TabsContent>
          </Tabs>
        </article>
      </div>

      {/* Similar movies ------------->  */}
      <div className="mt-12">
        <h2 className="text-xl text-white">Similar movies</h2>

        <main className="movie-container mt-4">
          {isSimilarMoviesLoading ? (
            <MoviesLoading />
          ) : similarMovies.length ? (
            similarMovies.map((movie: any) => (
              <Movie
                key={movie.id}
                id={movie.id}
                poster_path={movie.poster_path}
                title={movie.title || movie.name}
                rating={movie.vote_average.toFixed(1)}
                release_date={movie.release_date}
              />
            ))
          ) : (
            <h1 className="text-gray-light">Oops! Movies not added</h1>
          )}
        </main>
      </div>
    </main>
  );
}

export default MovieDetails;
