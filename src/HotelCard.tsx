import { MapPin, Star, Wifi, Coffee, Car } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function HotelCard({ data }: any) {
  //   const hotel = {
  //     name: "Hotel Indonesia Kempinski Jakarta",
  //     address: "Jl. M.H. Thamrin No.1, Menteng, Jakarta Pusat",
  //     rating: 4.8,
  //     price: 3500000,
  //     image:
  //       "https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/20020708-cba6d863056a1910b400710aacab716f.jpeg?_src=imagekit&tr=c-at_max,f-jpg,fo-auto,h-500,pr-true,q-80,w-740",
  //   };

  return (
    <Card className="w-full max-w-sm overflow-hidden shadow-md">
      <div className="relative h-40">
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover"
        />
        <Badge
          variant="secondary"
          className="absolute top-2 right-2 bg-white/80 text-primary"
        >
          Luxury
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-1 truncate">{data.name}</h3>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
          <span className="truncate">{data.address}</span>
        </div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="ml-1 font-semibold text-sm">{data.rating}</span>
          </div>
          <div className="flex space-x-2">
            <Wifi className="w-4 h-4 text-muted-foreground" />
            <Coffee className="w-4 h-4 text-muted-foreground" />
            <Car className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-primary">
            IDR {data.price.toLocaleString("id-ID")}
            <span className="text-xs font-normal text-muted-foreground ml-1">
              / night
            </span>
          </div>
          <Button
            size="sm"
            className="text-xs px-2 py-1 h-7 bg-blue-500 hover:bg-blue-600 text-white"
          >
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
