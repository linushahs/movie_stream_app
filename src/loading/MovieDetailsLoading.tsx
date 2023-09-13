import { Skeleton } from "@/components/ui/skeleton";

export default function MovieDetailsLoading() {
  return (
    <main className="main-container">
      <Skeleton className="hidden sm:block sm:w-[100px] h-8" />

      {/* Details section ------------>  */}
      <div className="dark text-white flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
        <Skeleton className="w-full aspect-video sm:aspect-[3/4] sm:w-[300px] sm:h-[450px] rounded-xl" />

        <article className="w-full">
          <div className="flex gap-3 items-center">
            <Skeleton className="w-[180px] h-6" />
          </div>

          <Skeleton className="mt-4 w-[140px] h-6" />

          {/* tabs section ----------->  */}
          {/* Overview , cast tabs ---------> */}
          <div className="w-full flex gap-4 mt-6">
            <Skeleton className="flex-1 h-8" />
            <Skeleton className="flex-1 h-8" />
            <Skeleton className="flex-1 h-8" />
          </div>

          <div className="w-full mt-4">
            <Skeleton className="w-[120px] h-6" />
            <ul className="flex flex-col gap-3 mt-6">
              {[
                new Array(3).fill(0).map((_, id) => (
                  <li key={id} className="flex items-center gap-4">
                    <Skeleton className="w-[100px] h-6" />
                    <Skeleton className="w-[160px] h-6" />
                  </li>
                )),
              ]}
            </ul>
          </div>

          {/* add to favorites button -------->  */}
          <Skeleton className="w-[140px] h-8 mt-8" />
        </article>
      </div>
    </main>
  );
}
