import {
  ageRatingOptions,
  seasonDetailsOptions,
  tvShowDetailsOptions,
  tvShowTrailersOptions,
  tvWatchProviderOptions,
} from "@/api/api";
import MovieDetailsLoading from "@/loading/MovieDetailsLoading";
import SeasonEpisodeLoading from "@/loading/SeasonEpisodeLoading";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate, useParams } from "react-router-dom";
import { A11y, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { twMerge } from "tailwind-merge";
import VideoPlayer from "../../VideoPlayer";
import FavoriteButton from "../../favorites/FavoriteButton";
import { ScrollArea } from "../../ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import CastItem from "../CastItem";
import WatchProvider from "../WatchProvider";

function TVShowDetails() {
  const [tvShowDetails, setTvShowDetails] = useState<any>({});
  const [trailers, setTrailers] = useState<any>([]);
  const [currentTrailer, setCurrentTrailer] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [ageRating, setAgeRating] = useState("");
  const [starringCast, setStarringCast] = useState([]);
  const [createdBy, setCreatedBy] = useState([]);
  const [seasonDetails, setSeasonDetails] = useState<any>();
  const [isSeasonEpisodeLoading, setIsSeasonEpisodeLoading] = useState(false);
  const [topCast, setTopCast] = useState([]);
  const [watchProviders, setWatchProviders] = useState<any>({});
  const { tvId } = useParams();
  const navigate = useNavigate();

  const getTVShowDetails = async () => {
    if (!tvId) return;

    setIsLoading(true);
    const options = tvShowDetailsOptions(tvId);
    await axios
      .request(options)
      .then((res) => {
        setTvShowDetails(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const getAgeRating = async () => {
    if (!tvId) return;

    setIsLoading(true);
    const options = ageRatingOptions(tvId);
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
        console.log(err);
      });
  };

  const getSeasonDetails = async (seasonNo: string) => {
    if (!tvId) return;

    setIsSeasonEpisodeLoading(true);
    const options = seasonDetailsOptions(tvId, seasonNo);
    await axios
      .request(options)
      .then((res) => {
        const results = res.data;
        setSeasonDetails(results);
        setIsSeasonEpisodeLoading(false);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleSeasonSelection = (seasonNo: string) => {
    getSeasonDetails(seasonNo);
  };

  const getTvShowTrailers = async () => {
    if (!tvId) return;

    const options = tvShowTrailersOptions(tvId);
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

  const getTvWatchProviders = async () => {
    if (!tvId) return;

    const options = tvWatchProviderOptions(tvId);
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
    getTVShowDetails();
    getAgeRating();
    getSeasonDetails("1");
    getTvShowTrailers();
    getTvWatchProviders();
  }, [tvId]);

  useEffect(() => {
    //starring cast and director
    if (tvShowDetails.credits) {
      const cast: any = tvShowDetails.credits.cast.filter(
        (_: any, id: number) => id < 3
      );

      setStarringCast(cast);
    }

    //created by
    const createdByRes = tvShowDetails.created_by;
    if (createdByRes) {
      let createdByInst = [];
      if (createdByRes.length) {
        createdByInst = createdByRes.map((obj: any) => obj);
        setCreatedBy(createdByInst);
      } else {
        createdByInst.push(createdByRes);
      }
    }

    //top cast
    if (tvShowDetails.credits) {
      const cast: any = tvShowDetails.credits.cast.filter(
        (_: any, id: number) => id < 8
      );
      setTopCast(cast);
    }
  }, [tvShowDetails]);

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
      <div className="dark text-white flex flex-col lg:flex-row items-start gap-4 sm:gap-6">
        <LazyLoadImage
          src={`https://image.tmdb.org/t/p/original/${tvShowDetails.poster_path}`}
          alt="poster"
          width={330}
          className="hidden lg:block rounded-xl aspect-[2/3]"
          loading="lazy"
        />

        <LazyLoadImage
          src={`https://image.tmdb.org/t/p/original/${tvShowDetails.backdrop_path}`}
          alt="poster"
          width={330}
          className="w-full rounded-xl aspect-video lg:hidden"
          loading="lazy"
        />

        <article>
          <h2 className="flex items-center text-2xl sm:text-3xl ">
            {tvShowDetails.name || tvShowDetails.title}
            <span className=" inline-flex items-center gap-1 text-sm ml-2 px-2 py-1 bg-dark rounded-md font-medium">
              {tvShowDetails.vote_average?.toFixed(1)}{" "}
              <AiFillStar className="w-4 h-4 text-yellow" />
            </span>
          </h2>

          <div className="flex gap-3 items-center my-2">
            <ul className="w-fit flex items-center divide-x divide-gray-dark text-gray-dark font-medium">
              <li className="pr-2">
                {tvShowDetails.first_air_date?.substring(0, 4)}
              </li>
              <li className="px-2">
                {tvShowDetails.number_of_seasons} seasons
              </li>
              <li className="pl-2">{ageRating}</li>
            </ul>

            {/* add to favorites button -------->  */}
            <FavoriteButton id={tvId as string} movie={tvShowDetails} />
          </div>

          {/* tabs section ----------->  */}
          {/* Overview , cast tabs ---------> */}
          <Tabs defaultValue="overview" className="tabs mt-6 sm:mt-8">
            <TabsList className="w-full sm:w-[460px] h-auto">
              <TabsTrigger value="overview" className="w-full  text-base">
                Overview
              </TabsTrigger>
              <TabsTrigger value="cast" className="w-full text-base">
                Cast
              </TabsTrigger>
              <TabsTrigger value="trailers" className="w-full text-base">
                Trailers
              </TabsTrigger>
              <TabsTrigger value="watch" className="text-base w-full">
                Watch
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <div className="w-full">
                <p className="text-gray-light pt-2">{tvShowDetails.overview}</p>
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
                      Created by:
                    </strong>
                    <p>{createdBy.map((c: any) => c.name).join(", ")}</p>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-0 sm:items-center mt-2">
                    <strong className="sm:w-[130px] text-gray-dark">
                      Genre:
                    </strong>
                    <p>
                      {tvShowDetails.genres
                        ?.map((genre: any) => genre.name)
                        .join(", ")}
                    </p>
                  </li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="cast">
              <div className="mt-4 grid grid-cols-3 gap-x-10 gap-y-2">
                {createdBy.map((d: any) => (
                  <CastItem
                    key={d.id}
                    name={d.name}
                    role={"Creator"}
                    profile_path={d.profile_path}
                    clip_string={false}
                  />
                ))}
              </div>
              <h2 className=" font-medium text-gray-light mt-4">Top Cast</h2>

              {/* Top cast slider with navigation ---------->  */}
              <div className=" grid grid-cols-3  gap-x-2 gap-y-6  mt-4">
                {topCast?.map((t: any) => (
                  <CastItem
                    key={t.id}
                    name={t.name || t.title}
                    role={t.character}
                    profile_path={t.profile_path}
                    className=""
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
                      <HiOutlineChevronLeft className="text-xl" />
                    </button>
                    <button
                      onClick={goToNextTrailer}
                      className="border border-gray-700 p-2 rounded-full hover:bg-dark"
                    >
                      <HiOutlineChevronRight className="text-xl" />
                    </button>
                  </div>
                </>
              )}
            </TabsContent>
            <TabsContent value="watch" className="w-[calc(100vw-42px)]">
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

      {/* seasons, episods ------------->  */}
      <div className="mt-12 w-full !relative">
        <Select onValueChange={handleSeasonSelection} defaultValue={"1"}>
          <SelectTrigger className="min-w-[125px] sm:min-w-[150px] max-w-fit text-md sm:text-lg text-white bg-dark">
            <SelectValue placeholder="Seasons" />
          </SelectTrigger>
          <SelectContent className="bg-dark text-white">
            {tvShowDetails.seasons && (
              <ScrollArea
                className={twMerge(
                  tvShowDetails.seasons.length > 6 ? "h-[250px]" : "h-fit"
                )}
              >
                {tvShowDetails.seasons.map((s: any) => (
                  <SelectItem
                    key={s.id}
                    value={`${s.season_number}`}
                    className="text-md"
                  >
                    {s.name}
                  </SelectItem>
                ))}
              </ScrollArea>
            )}
          </SelectContent>
        </Select>

        {isSeasonEpisodeLoading ? (
          <SeasonEpisodeLoading />
        ) : (
          <Swiper
            modules={[Scrollbar, A11y]}
            spaceBetween={20}
            slidesPerView={"auto"}
            scrollbar={{ draggable: true }}
            className=" h-full mt-4 rounded-lg"
          >
            {seasonDetails &&
              seasonDetails.episodes.map((episode: any) => (
                <SwiperSlide
                  key={episode.id}
                  className="!w-[350px] sm:!w-[500px] aspect-[16/9] rounded-xl  bg-gray-dark flex items-center justify-center object-cover"
                >
                  <div className="absolute w-full h-full top-0 left-0 bg-black/50 z-30"></div>
                  <img
                    src={`https://image.tmdb.org/t/p/original/${episode.still_path}`}
                    alt="thumbnail"
                    className="w-full h-full rounded-lg"
                    loading="lazy"
                  />

                  <div className="absolute bottom-3 left-3 text-white z-40">
                    <h1 className="text-md sm:text-xl font-medium">
                      S{episode.season_number}E{episode.episode_number}
                    </h1>
                    <h2 className="text-sm sm:text-lg">{episode.name}</h2>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        )}
      </div>
    </main>
  );
}

export default TVShowDetails;
