import type { BadgeTone } from "../../shared/ui/Badge/Badge";
import type {
  FilterOption,
  RecyclingCenter,
  TrashBin,
  TrashBinAvailability,
  TrashBinType,
} from "./types";

export const TRASH_BINS: TrashBin[] = [
  {
    id: "1",
    type: "recycling",
    name: "Central Park Recycling Station",
    location: "Main entrance, near fountain",
    distance: "0.2 mi",
    availability: "available",
    lastUpdated: "2 min ago",
    acceptedItems: ["Plastic", "Glass", "Metal", "Paper"],
  },
  {
    id: "2",
    type: "general",
    name: "Public Trash Bin",
    location: "5th & Main Street corner",
    distance: "0.4 mi",
    availability: "available",
    lastUpdated: "5 min ago",
    acceptedItems: ["General Waste"],
  },
  {
    id: "3",
    type: "electronic",
    name: "Electronic Waste Drop-off",
    location: "City Library - Side Entrance",
    distance: "0.6 mi",
    availability: "available",
    lastUpdated: "1 hour ago",
    acceptedItems: ["Electronics", "Batteries", "Phone", "Cables"],
  },
  {
    id: "4",
    type: "recycling",
    name: "Shopping Center Recycling",
    location: "Metro Mall Parking Lot",
    distance: "0.8 mi",
    availability: "full",
    lastUpdated: "30 min ago",
    acceptedItems: ["Plastic", "Glass", "Cardboard"],
  },
  {
    id: "5",
    type: "compost",
    name: "Community Compost Bin",
    location: "Community Garden",
    distance: "1.1 mi",
    availability: "available",
    lastUpdated: "15 min ago",
    acceptedItems: ["Food Waste", "Garden Waste", "Paper Towels"],
  },
];

export const RECYCLING_CENTERS: RecyclingCenter[] = [
  {
    id: "1",
    name: "EcoCenter Downtown",
    address: "123 Green Street, Downtown",
    distance: "0.8 mi",
    rating: 4.5,
    hours: "Mon-Sat 8AM-6PM",
    phone: "(555) 123-4567",
    acceptedMaterials: ["Plastic", "Glass", "Metal", "Paper", "Electronics"],
    image:
      "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?auto=format&fit=crop&w=1080&q=80",
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
    image:
      "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?auto=format&fit=crop&w=1080&q=80",
  },
  {
    id: "3",
    name: "Community Drop-off Point",
    address: "789 Oak Street, Northside",
    distance: "2.1 mi",
    rating: 3.9,
    hours: "24/7 Drop-off Available",
    acceptedMaterials: ["Plastic", "Glass", "Cans"],
    image:
      "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?auto=format&fit=crop&w=1080&q=80",
  },
];

export const FILTER_OPTIONS: FilterOption[] = [
  { value: "all", label: "전체 유형" },
  { value: "recycling", label: "재활용" },
  { value: "general", label: "일반" },
  { value: "electronic", label: "전자제품" },
  { value: "compost", label: "퇴비" },
];

export const TYPE_ACCENT: Record<TrashBinType, string> = {
  recycling: "#2563eb",
  general: "#64748b",
  compost: "#16a34a",
  electronic: "#7c3aed",
};

export const AVAILABILITY_TONE: Record<TrashBinAvailability, "success" | "danger" | "warning"> = {
  available: "success",
  full: "danger",
  maintenance: "warning",
};

export const MATERIAL_COLORS: Record<string, BadgeTone> = {
  Plastic: "info",
  Glass: "success",
  Metal: "danger",
  Paper: "warning",
  Electronics: "danger",
  Cardboard: "warning",
  "Food Waste": "success",
  "Garden Waste": "success",
  "Paper Towels": "warning",
  "General Waste": "neutral",
  Cans: "info",
  Batteries: "danger",
  Phone: "danger",
  Cables: "info",
};
