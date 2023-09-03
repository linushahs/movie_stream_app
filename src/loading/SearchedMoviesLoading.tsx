import { Skeleton } from "@/components/ui/skeleton";

export default function SearchedMoviesLoading() {
  return (
    <main className="flex flex-wrap gap-4 mt-4">
      {new Array(10).fill(0).map((_, id) => (
        <Skeleton
          key={id}
          className="min-w-[120px] lg:min-w-[180px] flex-1 h-[280px] rounded-2xl"
        />
      ))}
    </main>
  );
}
