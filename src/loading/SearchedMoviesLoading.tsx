import { Skeleton } from "@/components/ui/skeleton";

export default function SearchedMoviesLoading() {
  return (
    <>
      {new Array(5).fill(0).map((_, id) => (
        <div key={id} className="flex flex-col gap-2 cursor-pointer w-full ">
          <Skeleton className="w-full aspect-[2/3] rounded-xl transition-all " />
          <Skeleton className="w-[60px] h-4" />
          <Skeleton className="w-[120px] h-4" />
        </div>
      ))}
    </>
  );
}
