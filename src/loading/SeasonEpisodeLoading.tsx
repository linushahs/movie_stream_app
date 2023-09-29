import { Skeleton } from "@/components/ui/skeleton";

export default function SeasonEpisodeLoading() {
  return (
    <div className="s-skeleton flex gap-4 h-full mt-4 rounded-lg">
      {new Array(2).fill(0).map((_, id) => (
        <Skeleton
          key={id}
          className="!w-[350px] sm:!w-[500px] aspect-[16/9] rounded-xl   flex items-center justify-center object-cover"
        ></Skeleton>
      ))}
    </div>
  );
}
