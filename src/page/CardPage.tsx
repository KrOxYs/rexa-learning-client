import HotelCard from "@/HotelCard";

/**
 * A page component that displays a list of HotelCards.
 *
 * @prop {any[]} data - The list of hotels to display.
 * @returns A JSX element representing the page.
 */
export default function CardPage({ data }: any) {
  return (
    <div className="">
      <div className="flex justify-center md:justify-start gap-7 flex-wrap mt-10 md:ml-8">
        {data.map((hotel: any) => (
          <HotelCard data={hotel} key={hotel.id} />
        ))}
      </div>
    </div>
  );
}
