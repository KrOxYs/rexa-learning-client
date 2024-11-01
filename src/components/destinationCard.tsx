import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Star } from "lucide-react";

export default function DestinationCard({ data }: any) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold">{data.name}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-3">
          <Star className="w-5 h-5 text-yellow-400" />
          <div>
            <p className="font-medium">Rating</p>
            <p className="text-sm text-muted-foreground">
              {data.rating} out of 5
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <MapPin className="w-5 h-5 mt-0.5 text-muted-foreground" />
          <div>
            <p className="font-medium">Address</p>
            <p className="text-sm text-muted-foreground">{data.location}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
