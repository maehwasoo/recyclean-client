import styled from "@emotion/styled";
import { MapPin } from "lucide-react";
import { Card, CardContent } from "../../../shared/ui/Card/Card";

interface MapPlaceholderCardProps {
  binCount: number;
}

const PlaceholderContainer = styled.div`
  height: 200px;
  border-radius: 16px;
  background: linear-gradient(135deg, #e2e8f0, #cbd5f5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #475569;
  gap: 8px;
`;

const PlaceholderTitle = styled.div`
  font-weight: 600;
`;

const PlaceholderSubtitle = styled.div`
  font-size: 0.85rem;
`;

export function MapPlaceholderCard({ binCount }: MapPlaceholderCardProps) {
  return (
    <Card>
      <CardContent>
        <PlaceholderContainer>
          <MapPin size={28} />
          <PlaceholderTitle>지도 준비 중</PlaceholderTitle>
          <PlaceholderSubtitle>근처 {binCount}개의 배출함을 표시할 예정이에요.</PlaceholderSubtitle>
        </PlaceholderContainer>
      </CardContent>
    </Card>
  );
}
