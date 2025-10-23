import { ChangeEvent, useMemo, useState } from "react";
import styled from "@emotion/styled";
import { MapFilterCard } from "./components/MapFilterCard";
import { MapPlaceholderCard } from "./components/MapPlaceholderCard";
import { TrashBinList } from "./components/TrashBinList";
import { RecyclingCenterList } from "./components/RecyclingCenterList";
import { FILTER_OPTIONS, RECYCLING_CENTERS, TRASH_BINS } from "./constants";

const PageContainer = styled.div`
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;

export function MapPage() {
  const [selectedType, setSelectedType] = useState<string>("all");

  const filteredBins = useMemo(() => {
    if (selectedType === "all") return TRASH_BINS;
    return TRASH_BINS.filter((bin) => bin.type === selectedType);
  }, [selectedType]);

  const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
  };

  return (
    <PageContainer>
      <MapFilterCard
        selectedType={selectedType}
        options={FILTER_OPTIONS}
        onTypeChange={handleTypeChange}
      />
      <MapPlaceholderCard binCount={filteredBins.length} />
      <TrashBinList bins={filteredBins} />
      <RecyclingCenterList centers={RECYCLING_CENTERS} />
    </PageContainer>
  );
}
