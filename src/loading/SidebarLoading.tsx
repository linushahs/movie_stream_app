import { Skeleton } from "@/components/ui/skeleton";

export default function SidebarLoading() {
  return (
    <main className="flex flex-col">
      {new Array(3).fill(0).map((_, id) => (
        <div key={id} className="w-full flex gap-3 mb-4">
          <div className="left min-w-[70px]">
            <Skeleton className="h-[85px] w-full rounded-lg" />
          </div>
          <div className="right h-[85px] w-full flex flex-col justify-between">
            <div>
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4 mt-2" />
            </div>

            <Skeleton className="w-[50px] h-4" />
          </div>
        </div>
      ))}
    </main>
  );
}
