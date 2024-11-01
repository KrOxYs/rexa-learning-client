import HotelCardSkeleton from "@/page/Skeleton";

/**
 * A page component that displays a list of HotelCardSkeletons.
 *
 * This page is a simple, unstyled page that displays a list of HotelCardSkeletons.
 * It is intended to be used as a placeholder while the real data is loading.
 *
 * @returns A JSX element representing the page.
 */
export default function SkeletonPage() {
  return (
    <div className="bg-[url('https://pagedone.io/asset/uploads/1691055810.png')] bg-center bg-cover min-h-max">
      <div className="flex justify-center md:justify-start gap-7 flex-wrap mt-10 md:ml-8">
        {/* {data.map((hotel: any) => ( */}
        <HotelCardSkeleton />
        <HotelCardSkeleton />
        <HotelCardSkeleton />
        {/* ))} */}
      </div>
    </div>
  );
}
