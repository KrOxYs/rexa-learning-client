import DestinationCard from "../destinationCard";

export default function DestinationsPage({ data }: any) {
  return (
    <div className="">
      <div className="flex justify-center md:justify-start gap-7 flex-wrap mt-10 md:ml-8">
        {data.map((hotel: any) => (
          <DestinationCard data={hotel} key={hotel.id} />
        ))}
      </div>
    </div>
  );
}
