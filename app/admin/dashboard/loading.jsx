// app/(admin)/dashboard/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="p-4">
      <Skeleton className="h-8 w-[200px]" />
      <div className="grid grid-cols-3 gap-4 mt-6">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-xl" />
        ))}
      </div>
    </div>
  );
}