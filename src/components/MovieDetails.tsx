import { ageRatingOptions, movieDetailsOptions } from "@/api/api";
import MovieDetailsLoading from "@/loading/MovieDetailsLoading";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate, useParams } from "react-router-dom";
import CastItem from "./CastItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

function MovieDetails() {
  const [movieDetails, setMovieDetails] = useState<any>([]);
  const [isFavoritesClicked, setIsFavoriesClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [duration, setDuration] = useState("");
  const [ageRating, setAgeRating] = useState("");
  const [starringCast, setStarringCast] = useState([]);
  const [topCast, setTopCast] = useState([]);
  const [director, setDirector] = useState<any>([]);
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

  useEffect(() => {
    getMovieDetails();
    getAgeRating();
  }, [movieId]);

  useEffect(() => {
    //movie duration
    const runtime = parseInt(movieDetails.runtime);
    const hour = Math.floor(runtime / 60);
    const minute = runtime - hour * 60;
    setDuration(`${hour}hr ${minute}min`);

    //starring cast and director
    if (movieDetails.credits) {
      const cast: any = [];
      const directors = movieDetails.credits.crew.filter(
        (crew: any) => crew.job === "Director"
      );
      for (let i = 0; i < 3; i++) {
        cast.push(movieDetails.credits.cast[i]);
      }
      setStarringCast(cast);
      setDirector(directors.filter((_: any, id: number) => id < 2));
    }

    //top cast
    if (movieDetails.credits) {
      const cast: any = [];
      for (let i = 0; i < 8; i++) {
        cast.push(movieDetails.credits.cast[i]);
      }
      setTopCast(cast);
    }
  }, [movieDetails]);

  if (isLoading) return <MovieDetailsLoading />;

  return (
    <main className="w-full min-h-screen bg-black py-8 pr-8 pl-[112px] lg:pl-[250px] xl:pl-[calc(260px+32px)] border-r-[0.5px] border-r-gray-dark/50 ">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center justify-center border-2 border-gray-600 rounded-full p-2 cursor-pointer mb-6"
      >
        <BiArrowBack className="text-lg text-gray-light" />
      </button>

      {/* Details section ------------>  */}
      <div className="dark text-white flex items-start gap-6">
        <img
          src={`https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`}
          alt="poster"
          width={320}
          className=" rounded-xl bg-gray-dark aspect-[2/3]"
          loading="lazy"
        />

        <article>
          <div className="flex gap-3 items-center">
            <h2 className="text-3xl">{movieDetails.title}</h2>
            <span className="flex items-center gap-1 text-md px-2 py-1 bg-dark rounded-md font-medium">
              {movieDetails.vote_average?.toFixed(1)}{" "}
              <AiFillStar className="w-4 h-4 text-yellow" />
            </span>
          </div>

          <ul className="my-2 flex items-center divide-x divide-gray-dark text-gray-dark font-medium">
            <li className="pr-2">
              {movieDetails.release_date?.substring(0, 4)}
            </li>
            <li className="px-2">{duration}</li>
            <li className="pl-2">{ageRating}</li>
          </ul>

          {/* tabs section ----------->  */}
          {/* Overview , cast tabs ---------> */}
          <Tabs defaultValue="cast" className="tabs mt-8">
            <TabsList className="w-[300px] h-auto">
              <TabsTrigger value="overview" className="w-full text-base">
                Overview
              </TabsTrigger>
              <TabsTrigger value="cast" className="w-full text-base">
                Cast
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <div className="w-full">
                <p className="text-gray-light pt-2">{movieDetails.overview}</p>
                <ul className="mt-6">
                  <li className="flex items-center">
                    <strong className="w-[130px] text-gray-dark">
                      Starring:
                    </strong>
                    <p>
                      {starringCast.map((cast: any) => cast.name).join(", ")}
                    </p>
                  </li>
                  <li className="flex items-center mt-2">
                    <strong className="w-[130px] text-gray-dark">
                      Directed by:
                    </strong>
                    <p>{director.map((d: any) => d.name).join(", ")}</p>
                  </li>
                  <li className="flex items-center mt-2">
                    <strong className="w-[130px] text-gray-dark">Genre:</strong>
                    <p>
                      {movieDetails.genres
                        ?.map((genre: any) => genre.name)
                        .join(", ")}
                    </p>
                  </li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="cast" className="overflow-hidden">
              <div className="mt-4 flex flex-wrap gap-x-10">
                {director.map((d: any) => (
                  <CastItem
                    key={d.id}
                    name={d.name}
                    role={d.job}
                    profile_path={d.profile_path}
                  />
                ))}
              </div>
              <h2 className="text-lg font-medium text-gray-light mt-4">
                Top Cast
              </h2>

              {/* Top cast slider with navigation ---------->  */}
              <div className="w-full flex flex-wrap gap-4  mt-4">
                {topCast.map((t: any) => (
                  <CastItem
                    key={t.id}
                    name={t.name}
                    role={t.character}
                    profile_path={t.profile_path}
                    className="w-[210px]"
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* add to favorites button -------->  */}
          <button
            onClick={() => setIsFavoriesClicked(!isFavoritesClicked)}
            className="mt-6 px-3 py-1.5 rounded-lg hover:bg-dark/50 transition-colors bg-dark text-white "
          >
            <span className="flex items-center gap-2">
              {isFavoritesClicked ? (
                <AiFillStar className="text-xl text-amber-400" />
              ) : (
                <AiOutlineStar className="text-xl text-amber-400" />
              )}
              Add to Favorites
            </span>
          </button>
        </article>
      </div>

      {/* Similar movies ------------->  */}
      <div className="mt-8">
        <h2 className="text-xl text-white">Similar movies</h2>

        <div className="flex flex-wrap gap-4 mt-4">
          {new Array(5).fill(0).map((_, id) => (
            <div
              key={id}
              className="min-w-[120px] lg:min-w-[180px] flex-1 h-[280px] rounded-xl relative overflow-hidden"
            >
              <LazyLoadImage
                src={
                  "https://image.tmdb.org/t/p/original/kyeqWdyUXW608qlYkRqosgbbJyK.jpg"
                }
                alt="image"
                loading="lazy"
                className="w-full h-full rounded-2xl opacity-50 hover:scale-125 hover:rounded-2xl transition-all"
              />
              <button className="absolute top-4 right-4 py-0.5 px-2.5 text-xl text-white bg-gray-light/70 rounded-lg">
                +
              </button>
              <div className="details w-full flex flex-col gap-1 absolute bottom-6 text-center">
                <h3 className="text-center text-white">Avatar</h3>
                <p className="text-xs text-gray-light">2020-05-09</p>
                <p className="text-sm mt-1 text-white">
                  <span className="bg-yellow px-2 rounded-md text-black font-bold ">
                    IMDB
                  </span>
                  &nbsp; 9.8
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default MovieDetails;
