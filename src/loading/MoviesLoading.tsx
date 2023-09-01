import { Skeleton } from "@/components/ui/skeleton";

export default function MoviesLoading() {
  return (
    <>
      <Skeleton className="min-w-[120px] lg:min-w-[180px] flex-1 h-[280px] rounded-2xl" />
      <Skeleton className="min-w-[120px] lg:min-w-[180px] flex-1 h-[280px] rounded-2xl" />
      <Skeleton className="min-w-[120px] lg:min-w-[180px] flex-1 h-[280px] rounded-2xl" />
      <Skeleton className="min-w-[120px] lg:min-w-[180px] flex-1 h-[280px] rounded-2xl" />
      <Skeleton className="min-w-[120px] lg:min-w-[180px] flex-1 h-[280px] rounded-2xl" />
    </>
  );
}