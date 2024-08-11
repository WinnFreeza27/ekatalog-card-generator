import { Skeleton } from "../ui/skeleton"

export function SkeletonLoading() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Skeleton className="h-24 w-96 rounded-full" />
        <Skeleton className="h-4 w-96" />
        <Skeleton className="h-4 w-96" />
        <Skeleton className="h-4 w-96" />
        <Skeleton className="h-4 w-96" />
        <Skeleton className="h-4 w-96" />
    </div>
  )
}
