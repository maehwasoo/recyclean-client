import { useMemo, useState } from "react";
import styled from "@emotion/styled";
import {
  Clock,
  Filter,
  MapPin,
  Navigation,
  Phone,
  Recycle,
  Trash2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../shared/ui/Card/Card";
import { Button } from "../../shared/ui/Button/Button";
import { Badge } from "../../shared/ui/Badge/Badge";
import type { BadgeTone } from "../../shared/ui/Badge/Badge";
import { SelectField } from "../../shared/ui/SelectField/SelectField";
import { ImageWithFallback } from "../../shared/media/ImageWithFallback/ImageWithFallback";

const PageContainer = styled.div`
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;

const FilterRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  align-items: center;
`;

const BinList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const BinCard = styled(Card)<{ $accent: string }>`
  border-left: 4px solid ${({ $accent }) => $accent};
`;

const BinHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const BinInfo = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const BinMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const AcceptedItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const CenterGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const CenterCard = styled(Card)`
  overflow: hidden;
`;

const CenterMedia = styled.div`
  position: relative;
  height: 140px;
`;

const CenterContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

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
    location: "5th & Main Street corner",
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

const centers: RecyclingCenter[] = [
  {
    id: "1",
    name: "EcoCenter Downtown",
    address: "123 Green Street, Downtown",
    distance: "0.8 mi",
    rating: 4.5,
    hours: "Mon-Sat 8AM-6PM",
    phone: "(555) 123-4567",
    acceptedMaterials: ["Plastic", "Glass", "Metal", "Paper", "Electronics"],
    image: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?auto=format&fit=crop&w=1080&q=80"
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
    image: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?auto=format&fit=crop&w=1080&q=80"
  },
  {
    id: "3",
    name: "Community Drop-off Point",
    address: "789 Oak Street, Northside",
    distance: "2.1 mi",
    rating: 3.9,
    hours: "24/7 Drop-off Available",
    acceptedMaterials: ["Plastic", "Glass", "Cans"],
    image: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?auto=format&fit=crop&w=1080&q=80"
  }
];

const typeAccent: Record<TrashBin["type"], string> = {
  recycling: "#2563eb",
  general: "#64748b",
  compost: "#16a34a",
  electronic: "#7c3aed"
};

const availabilityTone: Record<TrashBin["availability"], "success" | "danger" | "warning"> = {
  available: "success",
  full: "danger",
  maintenance: "warning"
};

const filterOptions = [
  { value: "all", label: "전체 유형" },
  { value: "recycling", label: "재활용" },
  { value: "general", label: "일반" },
  { value: "electronic", label: "전자제품" },
  { value: "compost", label: "퇴비" }
];

const materialColors: Record<string, BadgeTone> = {
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
  Cables: "info"
};

export function MapPage() {
  const [selectedType, setSelectedType] = useState<string>("all");

  const filteredBins = useMemo(() => {
    if (selectedType === "all") return trashBins;
    return trashBins.filter((bin) => bin.type === selectedType);
  }, [selectedType]);

  return (
    <PageContainer>
      <Card>
        <CardHeader>
          <CardTitle>
            <MapPin size={18} />
            내 주변 배출함
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="outline" style={{ width: "100%" }}>
            <Navigation size={18} />
            내 위치 사용하기
          </Button>
          <FilterRow>
            <Filter size={16} color="#64748b" />
            <SelectField
              options={filterOptions}
              value={selectedType}
              onChange={(event) => setSelectedType(event.target.value)}
            />
          </FilterRow>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div
            style={{
              height: 200,
              borderRadius: "16px",
              background: "linear-gradient(135deg, #e2e8f0, #cbd5f5)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "#475569",
              gap: "8px"
            }}
          >
            <MapPin size={28} />
            <div style={{ fontWeight: 600 }}>지도 준비 중</div>
            <div style={{ fontSize: "0.85rem" }}>근처 {filteredBins.length}개의 배출함을 표시할 예정이에요.</div>
          </div>
        </CardContent>
      </Card>

      <BinList>
        {filteredBins.map((bin) => (
          <BinCard key={bin.id} $accent={typeAccent[bin.type]}>
            <CardContent>
              <BinHeader>
                <BinInfo>
                  {bin.type === "recycling" ? <Recycle size={18} /> : <Trash2 size={18} />}
                  <BinMeta>
                    <span style={{ fontWeight: 600 }}>{bin.name}</span>
                    <span style={{ fontSize: "0.8rem", color: "#475569" }}>{bin.location}</span>
                    <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
                      <Clock size={12} /> {bin.lastUpdated}
                    </span>
                  </BinMeta>
                </BinInfo>
                <div style={{ textAlign: "right" }}>
                  <Badge variant="outline">{bin.distance}</Badge>
                  <div style={{ marginTop: "6px" }}>
                    <Badge tone={availabilityTone[bin.availability]}>
                      {bin.availability === "available"
                        ? "이용 가능"
                        : bin.availability === "full"
                        ? "가득 참"
                        : "점검 중"}
                    </Badge>
                  </div>
                </div>
              </BinHeader>

              <div style={{ marginTop: "12px" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 600, marginBottom: "4px" }}>수거 품목</div>
                <AcceptedItems>
                  {bin.acceptedItems.map((item) => (
                    <Badge key={item} variant="soft" tone={materialColors[item] ?? "neutral"}>
                      {item}
                    </Badge>
                  ))}
                </AcceptedItems>
              </div>

              <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                <Button variant="outline" size="sm" style={{ flex: 1 }}>
                  <Navigation size={14} />
                  길 찾기
                </Button>
                <Button variant="outline" size="sm" style={{ flex: 1 }}>
                  상태 신고
                </Button>
              </div>
            </CardContent>
          </BinCard>
        ))}
      </BinList>

      {filteredBins.length === 0 && (
        <Card>
          <CardContent style={{ textAlign: "center", color: "#64748b" }}>
            선택한 조건에 맞는 배출함이 없어요.
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>
            <MapPin size={18} />
            재활용 센터
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CenterGrid>
            {centers.map((center) => (
              <CenterCard key={center.id}>
                <CenterMedia>
                  <ImageWithFallback
                    src={center.image}
                    alt={center.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div style={{ position: "absolute", top: 12, right: 12 }}>
                    <Badge variant="outline">{center.distance}</Badge>
                  </div>
                </CenterMedia>
                <CenterContent>
                  <div>
                    <h3 style={{ margin: 0 }}>{center.name}</h3>
                    <div style={{ fontSize: "0.8rem", color: "#475569" }}>{center.address}</div>
                  </div>

                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {center.acceptedMaterials.map((material) => (
                      <Badge key={material} tone={materialColors[material] ?? "neutral"}>
                        {material}
                      </Badge>
                    ))}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "0.8rem" }}>
                    <span>
                      <Clock size={12} /> {center.hours}
                    </span>
                    {center.phone && (
                      <span>
                        <Phone size={12} /> {center.phone}
                      </span>
                    )}
                  </div>

                  <div style={{ display: "flex", gap: "8px" }}>
                    <Button variant="outline" size="sm" style={{ flex: 1 }}>
                      <Navigation size={14} />
                      길 찾기
                    </Button>
                    {center.phone && (
                      <Button variant="outline" size="sm" style={{ flex: 1 }}>
                        <Phone size={14} />
                        전화하기
                      </Button>
                    )}
                  </div>
                </CenterContent>
              </CenterCard>
            ))}
          </CenterGrid>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
