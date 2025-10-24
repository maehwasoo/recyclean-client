import styled from "@emotion/styled";
import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/ui/Card/Card";
import { Badge } from "../../../shared/ui/Badge/Badge";
import { Button } from "../../../shared/ui/Button/Button";
import { ImageWithFallback } from "../../../shared/media/ImageWithFallback/ImageWithFallback";
import { MATERIAL_COLORS } from "../constants";
import type { RecyclingCenter } from "../types";

interface RecyclingCenterListProps {
  centers: RecyclingCenter[];
}

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

const MaterialChips = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

const InfoStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 0.8rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

export function RecyclingCenterList({ centers }: RecyclingCenterListProps) {
  return (
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

                <MaterialChips>
                  {center.acceptedMaterials.map((material) => (
                    <Badge key={material} tone={MATERIAL_COLORS[material] ?? "neutral"}>
                      {material}
                    </Badge>
                  ))}
                </MaterialChips>

                <InfoStack>
                  <span>
                    <Clock size={12} /> {center.hours}
                  </span>
                  {center.phone && (
                    <span>
                      <Phone size={12} /> {center.phone}
                    </span>
                  )}
                </InfoStack>

                <ActionButtons>
                  <Button variant="outline" size="sm" style={{ flex: 1 }}>
                    <Navigation size={14} />길 찾기
                  </Button>
                  {center.phone && (
                    <Button variant="outline" size="sm" style={{ flex: 1 }}>
                      <Phone size={14} />
                      전화하기
                    </Button>
                  )}
                </ActionButtons>
              </CenterContent>
            </CenterCard>
          ))}
        </CenterGrid>
      </CardContent>
    </Card>
  );
}
