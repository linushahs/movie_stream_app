import {
  ageRatingOptions,
  seasonDetailsOptions,
  tvShowDetailsOptions,
} from "@/api/api";
import MovieDetailsLoading from "@/loading/MovieDetailsLoading";
import SeasonEpisodeLoading from "@/loading/SeasonEpisodeLoading";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { A11y, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";
import { twMerge } from "tailwind-merge";

function TVShowDetails() {
  const [tvShowDetails, setTvShowDetails] = useState<any>({});
  const [isFavoritesClicked, setIsFavoriesClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [ageRating, setAgeRating] = useState("");
  const [starringCast, setStarringCast] = useState([]);
  const [createdBy, setCreatedBy] = useState([]);
  const [seasonDetails, setSeasonDetails] = useState<any>();
  const [isSeasonEpisodeLoading, setIsSeasonEpisodeLoading] = useState(false);
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
        alert(err);
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
    console.log("clicked");
    getSeasonDetails(seasonNo);
  };

  useEffect(() => {
    getTVShowDetails();
    getAgeRating();
    getSeasonDetails("1");
  }, [tvId]);

  useEffect(() => {
    //starring cast and director
    if (tvShowDetails.credits) {
      const cast: any = [];

      if (tvShowDetails.credits.cast.length >= 3) {
        for (let i = 0; i < 3; i++) {
          cast.push(tvShowDetails.credits.cast[i]);
        }

        setStarringCast(cast);
      } else {
        setStarringCast(tvShowDetails.credits.cast);
      }
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
  }, [tvShowDetails]);

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
          src={`https://image.tmdb.org/t/p/original/${tvShowDetails.poster_path}`}
          alt="poster"
          width={330}
          className="rounded-xl aspect-[2/3]"
          loading="lazy"
        />

        <article>
          <div className="flex gap-3 items-center">
            <h2 className="text-3xl">
              {tvShowDetails.name || tvShowDetails.title}
            </h2>
            <span className="flex items-center gap-1 text-md px-2 py-1 bg-dark rounded-md font-medium">
              {tvShowDetails.vote_average?.toFixed(1)}{" "}
              <AiFillStar className="w-4 h-4 text-yellow" />
            </span>
          </div>

          <ul className="my-2 flex items-center divide-x divide-gray-dark text-gray-dark font-medium">
            <li className="pr-2">
              {tvShowDetails.first_air_date?.substring(0, 4)}
            </li>
            <li className="px-2">{tvShowDetails.number_of_seasons} seasons</li>
            <li className="pl-2">{ageRating}</li>
          </ul>

          {/* tabs section ----------->  */}
          {/* Overview , cast tabs ---------> */}
          <Tabs defaultValue="overview" className=" mt-8">
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
                <p className="text-gray-light pt-2">{tvShowDetails.overview}</p>
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
                      Created by:
                    </strong>
                    <p>{createdBy.map((c: any) => c.name).join(", ")}</p>
                  </li>
                  <li className="flex items-center mt-2">
                    <strong className="w-[130px] text-gray-dark">Genre:</strong>
                    <p>
                      {tvShowDetails.genres
                        ?.map((genre: any) => genre.name)
                        .join(", ")}
                    </p>
                  </li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="cast">Change your cast here.</TabsContent>
          </Tabs>

          {/* add to favorites button -------->  */}
          <button
            onClick={() => setIsFavoriesClicked(!isFavoritesClicked)}
            className="mt-6 px-3 py-1.5 rounded-md hover:bg-dark/50 transition-colors bg-dark text-white "
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

      {/* seasons, episods ------------->  */}
      <div className="mt-8 w-full !relative">
        <Select onValueChange={handleSeasonSelection} defaultValue={"1"}>
          <SelectTrigger className="min-w-[150px] max-w-fit text-lg text-white bg-dark">
            <SelectValue placeholder="Seasons" />
          </SelectTrigger>
          <SelectContent className="bg-dark text-white">
            <ScrollArea
              className={twMerge(
                tvShowDetails.seasons.length > 6 ? "h-[250px]" : "h-fit"
              )}
            >
              {tvShowDetails.seasons &&
                tvShowDetails.seasons.map((s: any) => (
                  <SelectItem
                    key={s.id}
                    value={`${s.season_number}`}
                    className="text-md"
                  >
                    {s.name}
                  </SelectItem>
                ))}
            </ScrollArea>
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
                  className="!w-[550px] aspect-[16/9] rounded-xl  bg-gray-dark flex items-center justify-center object-cover"
                >
                  <div className="absolute w-full h-full top-0 left-0 bg-black/50 z-30"></div>
                  <img
                    src={`https://image.tmdb.org/t/p/original/${episode.still_path}`}
                    alt="thumbnail"
                    className="w-full h-full rounded-lg"
                    loading="lazy"
                  />

                  <div className="absolute bottom-3 left-3 text-white z-40">
                    <h1 className="text-xl font-medium">
                      S{episode.season_number}E{episode.episode_number}
                    </h1>
                    <h2 className="text-lg">{episode.name}</h2>
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
