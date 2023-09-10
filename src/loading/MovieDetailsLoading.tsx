import { Skeleton } from "@/components/ui/skeleton";

export default function MovieDetailsLoading() {
  return (
    <main className="w-full min-h-screen bg-black py-8 pr-8 pl-[112px] lg:pl-[250px] xl:pl-[calc(260px+32px)] border-r-[0.5px] border-r-gray-dark/50 ">
      <Skeleton className="w-[100px] h-8" />

      {/* Details section ------------>  */}
      <div className="dark text-white flex gap-6 mt-6">
        <Skeleton className="w-[300px] h-[450px] rounded-xl" />

        <article>
          <div className="flex gap-3 items-center">
            <Skeleton className="w-[180px] h-6" />
          </div>

          <Skeleton className="mt-4 w-[140px] h-6" />

          {/* tabs section ----------->  */}
          {/* Overview , cast tabs ---------> */}
          <div className="flex gap-4 mt-6">
            <Skeleton className="w-[200px] h-8" />
            <Skeleton className="w-[200px] h-8" />
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
