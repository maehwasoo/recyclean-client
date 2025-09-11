import { useState } from "react";
import { MapPin, Navigation, Clock, Phone, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface RecyclingCenter {
  id: string;
  name: string;
  address: string;
  distance: string;
  rating: number;
  hours: string;
  phone?: string;
  acceptedMaterials: string[];
  image: string;
}

const mockCenters: RecyclingCenter[] = [
  {
    id: "1",
    name: "EcoCenter Downtown",
    address: "123 Green Street, Downtown",
    distance: "0.8 mi",
    rating: 4.5,
    hours: "Mon-Sat 8AM-6PM",
    phone: "(555) 123-4567",
    acceptedMaterials: ["Plastic", "Glass", "Metal", "Paper", "Electronics"],
    image: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWN5Y2xpbmclMjBjZW50ZXIlMjBiaW5zfGVufDF8fHx8MTc1NzA0MzcwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: "2", 
    name: "Green Valley Recycling",
    address: "456 Maple Avenue, Westside",
    distance: "1.2 mi",
    rating: 4.2,
    hours: "Mon-Fri 9AM-5PM",
    phone: "(555) 234-5678",
    acceptedMaterials: ["Plastic", "Glass", "Metal", "Cardboard"],
    image: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWN5Y2xpbmclMjBjZW50ZXIlMjBiaW5zfGVufDF8fHx8MTc1NzA0MzcwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: "3",
    name: "Community Drop-off Point",
    address: "789 Oak Street, Northside", 
    distance: "2.1 mi",
    rating: 3.9,
    hours: "24/7 Drop-off Available",
    acceptedMaterials: ["Plastic", "Glass", "Cans"],
    image: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWN5Y2xpbmclMjBjZW50ZXIlMjBiaW5zfGVufDF8fHx8MTc1NzA0MzcwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  }
];

export function LocationFinder() {
  const [centers] = useState<RecyclingCenter[]>(mockCenters);

  const getMaterialColor = (material: string) => {
    const colors: { [key: string]: string } = {
      "Plastic": "bg-blue-100 text-blue-800",
      "Glass": "bg-green-100 text-green-800",
      "Metal": "bg-gray-100 text-gray-800",
      "Paper": "bg-yellow-100 text-yellow-800",
      "Electronics": "bg-purple-100 text-purple-800",
      "Cardboard": "bg-orange-100 text-orange-800",
      "Cans": "bg-red-100 text-red-800"
    };
    return colors[material] || "bg-gray-100 text-gray-800";
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Nearby Recycling Centers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button className="w-full mb-4" variant="outline">
            <Navigation className="h-4 w-4 mr-2" />
            Use My Location
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {centers.map((center) => (
          <Card key={center.id} className="overflow-hidden">
            <div className="relative h-32">
              <ImageWithFallback
                src={center.image}
                alt={center.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="bg-white/90 text-black">
                  {center.distance}
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-medium mb-1">{center.name}</h3>
                  <div className="flex items-center gap-1 mb-1">
                    {renderStars(center.rating)}
                    <span className="text-sm text-muted-foreground ml-1">
                      ({center.rating})
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{center.address}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{center.hours}</span>
                </div>
                
                {center.phone && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-3 w-3" />
                    <span>{center.phone}</span>
                  </div>
                )}
              </div>

              <div className="mb-3">
                <div className="text-sm font-medium mb-2">Accepted Materials:</div>
                <div className="flex flex-wrap gap-1">
                  {center.acceptedMaterials.map((material, index) => (
                    <Badge 
                      key={index}
                      className={getMaterialColor(material)}
                      variant="secondary"
                    >
                      {material}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Navigation className="h-3 w-3 mr-1" />
                  Directions
                </Button>
                {center.phone && (
                  <Button variant="outline" size="sm" className="flex-1">
                    <Phone className="h-3 w-3 mr-1" />
                    Call
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}