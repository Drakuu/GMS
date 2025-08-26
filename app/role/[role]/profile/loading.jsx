// app/role/[role]/profile/loading.jsx
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
   return (
      <div className="container mx-auto p-6 max-w-4xl space-y-6">
         {/* Header skeleton */}
         <div className="flex items-center gap-6 p-6 bg-card rounded-lg">
            <Skeleton className="h-24 w-24 rounded-full" />
            <div className="space-y-2 flex-1">
               <Skeleton className="h-8 w-64" />
               <Skeleton className="h-4 w-48" />
               <Skeleton className="h-4 w-32" />
            </div>
         </div>

         {/* Form skeleton */}
         <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-32" />
         </div>
      </div>
   );
}