import { useState } from "react";
import { Search, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Material {
  name: string;
  recyclable: boolean;
  category: string;
  instructions: string;
  tips?: string;
}

const materials: Material[] = [
  {
    name: "Plastic Bottles",
    recyclable: true,
    category: "Plastic",
    instructions: "Remove caps and labels. Rinse clean.",
    tips: "Look for recycling symbols #1 (PET) or #2 (HDPE)"
  },
  {
    name: "Glass Jars",
    recyclable: true,
    category: "Glass",
    instructions: "Rinse clean. Remove metal lids.",
    tips: "Can be recycled endlessly without quality loss"
  },
  {
    name: "Pizza Boxes",
    recyclable: false,
    category: "Paper",
    instructions: "Grease and food residue contaminate recycling.",
    tips: "Compost clean parts, discard greasy sections"
  },
  {
    name: "Aluminum Cans",
    recyclable: true,
    category: "Metal",
    instructions: "Rinse clean. Crushing saves space.",
    tips: "Most valuable recyclable material"
  },
  {
    name: "Styrofoam",
    recyclable: false,
    category: "Plastic",
    instructions: "Not accepted in curbside recycling.",
    tips: "Take to special styrofoam recycling locations"
  },
  {
    name: "Newspaper",
    recyclable: true,
    category: "Paper",
    instructions: "Keep dry and clean.",
    tips: "Can be recycled 5-7 times before fibers break down"
  }
];

export function MaterialLookup() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredMaterials = materials.filter(material =>
    material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (recyclable: boolean) => {
    return recyclable ? (
      <CheckCircle className="h-5 w-5 text-green-600" />
    ) : (
      <XCircle className="h-5 w-5 text-red-600" />
    );
  };

  const getStatusBadge = (recyclable: boolean) => {
    return recyclable ? (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Recyclable</Badge>
    ) : (
      <Badge variant="destructive">Not Recyclable</Badge>
    );
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Material Lookup
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search materials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {filteredMaterials.map((material, index) => (
          <Card key={index} className="border-l-4 border-l-transparent hover:border-l-primary transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getStatusIcon(material.recyclable)}
                  <h3 className="font-medium">{material.name}</h3>
                </div>
                {getStatusBadge(material.recyclable)}
              </div>
              
              <p className="text-sm text-muted-foreground mb-2">{material.instructions}</p>
              
              {material.tips && (
                <div className="flex items-start gap-2 p-2 bg-muted rounded-md">
                  <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-muted-foreground">{material.tips}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredMaterials.length === 0 && searchTerm && (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">No materials found for "{searchTerm}"</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}