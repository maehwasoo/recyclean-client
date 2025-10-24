import { ChangeEvent } from "react";
import styled from "@emotion/styled";
import { MapPin, Navigation, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/ui/Card/Card";
import { Button } from "../../../shared/ui/Button/Button";
import { SelectField } from "../../../shared/ui/SelectField/SelectField";
import type { FilterOption } from "../types";

interface MapFilterCardProps {
  selectedType: string;
  options: FilterOption[];
  onTypeChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onUseLocationClick?: () => void;
}

const FilterRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  align-items: center;
`;

const FullWidthButton = styled(Button)`
  width: 100%;
`;

export function MapFilterCard({
  selectedType,
  options,
  onTypeChange,
  onUseLocationClick,
}: MapFilterCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <MapPin size={18} />내 주변 배출함
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FullWidthButton variant="outline" onClick={onUseLocationClick}>
          <Navigation size={18} />내 위치 사용하기
        </FullWidthButton>
        <FilterRow>
          <Filter size={16} color="#64748b" />
          <SelectField options={options} value={selectedType} onChange={onTypeChange} />
        </FilterRow>
      </CardContent>
    </Card>
  );
}
