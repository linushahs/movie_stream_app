import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useState } from "react";

function MovieDetails() {
  const [isFavoritesClicked, setIsFavoriesClicked] = useState(false);

  return (
    <main className="w-full min-h-screen bg-black py-8 pr-8 pl-[112px] lg:pl-[250px] xl:pl-[calc(260px+32px)] border-r-[0.5px] border-r-gray-dark/50 ">
      <button className="flex items-center justify-center border-2 border-gray-600 rounded-full p-2 cursor-pointer mb-6">
        <BiArrowBack className="text-lg text-gray-light" />
      </button>

      {/* Details section ------------>  */}
      <div className="dark text-white flex gap-6">
        <img
          src="https://image.tmdb.org/t/p/original/kyeqWdyUXW608qlYkRqosgbbJyK.jpg"
          alt="poster"
          width={300}
          className="rounded-2xl"
        />

        <article>
          <div className="flex gap-3 items-center">
            <h2 className="text-3xl">Avenger's Infinity War</h2>
            <span className="flex items-center gap-1 text-md px-2 py-1 bg-dark rounded-md font-medium">
              9.8 <AiFillStar className="w-4 h-4 text-yellow" />
            </span>
          </div>

          <ul className="my-2 flex items-center divide-x divide-gray-dark text-gray-dark font-medium">
            <li className="pr-2">2020</li>
            <li className="px-2">2h 13min</li>
            <li className="pl-2">18+</li>
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
                <p className="text-gray-light pt-2">
                  An exploratory dive into the deepest depths of the ocean of a
                  daring research team spirals into chaos when a malevolent
                  mining operation threatens their mission and forces them into
                  a high-stakes battle for survival.{" "}
                </p>
                <ul className="mt-6">
                  <li className="flex items-center">
                    <strong className="w-[130px] text-gray-dark">Genre:</strong>
                    <p>Action, Genre, Comedy</p>
                  </li>
                  <li className="flex items-center mt-2">
                    <strong className="w-[130px] text-gray-dark">
                      Created by:
                    </strong>
                    <p>Stan Lee</p>
                  </li>
                  <li className="flex items-center mt-2">
                    <strong className="w-[130px] text-gray-dark">
                      Created by:
                    </strong>
                    <p>Stan Lee</p>
                  </li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="cast">Change your cast here.</TabsContent>
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

        <div className="flex gap-4 mt-4">
          {new Array(5).fill(0).map((_, id) => (
            <div
              key={id}
              className="min-w-[120px] lg:min-w-[180px] flex-1 h-[280px] rounded-2xl relative overflow-hidden"
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
