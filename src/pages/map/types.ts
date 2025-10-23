export interface TrashBin {
  id: string;
  type: "general" | "recycling" | "compost" | "electronic";
  name: string;
  location: string;
  distance: string;
  availability: "available" | "full" | "maintenance";
  lastUpdated: string;
  acceptedItems: string[];
}

export type TrashBinType = TrashBin["type"];

export type TrashBinAvailability = TrashBin["availability"];

export interface RecyclingCenter {
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

export interface FilterOption {
  value: string;
  label: string;
}
