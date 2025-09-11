import { useState } from "react";
import { MapPin, Navigation, Clock, Filter, Trash2, Recycle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface TrashBin {
  id: string;
  type: "general" | "recycling" | "compost" | "electronic";
  name: string;
  location: string;
  distance: string;
  availability: "available" | "full" | "maintenance";
  lastUpdated: string;
  acceptedItems: string[];
}

const trashBins: TrashBin[] = [
  {
    id: "1",
    type: "recycling",
    name: "Central Park Recycling Station",
    location: "Main entrance, near fountain",
    distance: "0.2 mi",
    availability: "available",
    lastUpdated: "2 min ago",
    acceptedItems: ["Plastic", "Glass", "Metal", "Paper"]
  },
  {
    id: "2",
    type: "general",
    name: "Public Trash Bin",
    location: "Corner of 5th & Main Street",
    distance: "0.4 mi", 
    availability: "available",
    lastUpdated: "5 min ago",
    acceptedItems: ["General Waste"]
  },
  {
    id: "3",
    type: "electronic",
    name: "Electronic Waste Drop-off",
    location: "City Library - Side Entrance",
    distance: "0.6 mi",
    availability: "available",
    lastUpdated: "1 hour ago",
    acceptedItems: ["Electronics", "Batteries", "Phone", "Cables"]
  },
  {
    id: "4",
    type: "recycling", 
    name: "Shopping Center Recycling",
    location: "Metro Mall Parking Lot",
    distance: "0.8 mi",
    availability: "full",
    lastUpdated: "30 min ago",
    acceptedItems: ["Plastic", "Glass", "Cardboard"]
  },
  {
    id: "5",
    type: "compost",
    name: "Community Compost Bin",
    location: "Community Garden",
    distance: "1.1 mi",
    availability: "available",
    lastUpdated: "15 min ago",
    acceptedItems: ["Food Waste", "Garden Waste", "Paper Towels"]
  }
];

export function TrashBinMap() {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [filteredBins, setFilteredBins] = useState(trashBins);

  const handleFilterChange = (type: string) => {
    setSelectedType(type);
    if (type === "all") {
      setFilteredBins(trashBins);
    } else {
      setFilteredBins(trashBins.filter(bin => bin.type === type));
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "recycling":
        return <Recycle className="h-4 w-4" />;
      case "electronic":
        return <div className="h-4 w-4 bg-purple-600 rounded text-white text-xs flex items-center justify-center">e</div>;
      case "compost":
        return <div className="h-4 w-4 bg-green-600 rounded text-white text-xs flex items-center justify-center">c</div>;
      default:
        return <Trash2 className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    const colors = {
      recycling: "bg-blue-100 text-blue-800",
      general: "bg-gray-100 text-gray-800",
      electronic: "bg-purple-100 text-purple-800",
      compost: "bg-green-100 text-green-800"
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case "available":
        return <Badge className="bg-green-100 text-green-800">Available</Badge>;
      case "full":
        return <Badge variant="destructive">Full</Badge>;
      case "maintenance":
        return <Badge className="bg-yellow-100 text-yellow-800">Maintenance</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {/* Header with Location */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Nearby Trash Bins
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full" variant="outline">
            <Navigation className="h-4 w-4 mr-2" />
            Use My Location
          </Button>
          
          {/* Filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={selectedType} onValueChange={handleFilterChange}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="recycling">Recycling</SelectItem>
                <SelectItem value="general">General Waste</SelectItem>
                <SelectItem value="electronic">Electronic Waste</SelectItem>
                <SelectItem value="compost">Compost</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Map Placeholder */}
      <Card>
        <CardContent className="p-4">
          <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <div className="text-sm text-muted-foreground">Interactive map view</div>
              <div className="text-xs text-muted-foreground">Shows {filteredBins.length} nearby bins</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bins List */}
      <div className="space-y-3">
        {filteredBins.map((bin) => (
          <Card key={bin.id} className={`border-l-4 ${
            bin.availability === "available" ? "border-l-green-500" :
            bin.availability === "full" ? "border-l-red-500" : "border-l-yellow-500"
          }`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getTypeIcon(bin.type)}
                  <div>
                    <h3 className="font-medium text-sm">{bin.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{bin.location}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="text-xs mb-1">
                    {bin.distance}
                  </Badge>
                  <div>{getAvailabilityBadge(bin.availability)}</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>Updated {bin.lastUpdated}</span>
                </div>

                <div>
                  <Badge className={getTypeColor(bin.type)} variant="secondary">
                    {bin.type.charAt(0).toUpperCase() + bin.type.slice(1)}
                  </Badge>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-medium">Accepts:</div>
                  <div className="flex flex-wrap gap-1">
                    {bin.acceptedItems.map((item, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-3">
                <Button variant="outline" size="sm" className="flex-1">
                  <Navigation className="h-3 w-3 mr-1" />
                  Directions
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Report Issue
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBins.length === 0 && (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">No bins found for the selected type</p>
          </CardContent>
        </Card>
      )}

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Legend</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-1 bg-green-500 rounded"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-1 bg-red-500 rounded"></div>
              <span>Full</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-1 bg-yellow-500 rounded"></div>
              <span>Maintenance</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}