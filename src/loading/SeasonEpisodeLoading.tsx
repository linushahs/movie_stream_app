import { Skeleton } from "@/components/ui/skeleton";
import { A11y, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function SeasonEpisodeLoading() {
  return (
    <Swiper
      modules={[Scrollbar, A11y]}
      spaceBetween={20}
      slidesPerView={"auto"}
      scrollbar={{ draggable: true }}
      className="h-full mt-4 rounded-lg"
    >
      {new Array(2).fill(0).map((_, id) => (
        <SwiperSlide
          key={id}
          className="!w-[350px] sm:!w-[500px] aspect-[16/9] rounded-xl  bg-gray-dark flex items-center justify-center object-cover"
        >
          <Skeleton className=" aspect-[16/9] rounded-xl   flex items-center justify-center object-cover"></Skeleton>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
