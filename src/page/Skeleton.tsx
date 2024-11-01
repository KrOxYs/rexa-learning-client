import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function HotelCardSkeleton() {
  return (
    <Card className="w-full max-w-sm overflow-hidden shadow-md">
      <div className="relative h-40">
        <Skeleton className="w-full h-full" />
        <Skeleton className="absolute top-2 right-2 h-5 w-16" />
      </div>
      <CardContent className="p-4">
        <Skeleton className="h-6 w-3/4 mb-1" />
        <Skeleton className="h-4 w-full mb-2" />
        <div className="flex items-center justify-between mb-3">
          <Skeleton className="h-4 w-16" />
          <div className="flex space-x-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-4" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-8 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}
