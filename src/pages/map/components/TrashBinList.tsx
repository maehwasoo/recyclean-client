import styled from "@emotion/styled";
import { Clock, Navigation, Recycle, Trash2 } from "lucide-react";
import { Card, CardContent } from "../../../shared/ui/Card/Card";
import { Badge } from "../../../shared/ui/Badge/Badge";
import { Button } from "../../../shared/ui/Button/Button";
import { AVAILABILITY_TONE, MATERIAL_COLORS, TYPE_ACCENT } from "../constants";
import type { TrashBin } from "../types";

interface TrashBinListProps {
  bins: TrashBin[];
}

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

const EmptyStateCard = styled(CardContent)`
  text-align: center;
  color: #64748b;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

const SectionLabel = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 4px;
`;

export function TrashBinList({ bins }: TrashBinListProps) {
  if (bins.length === 0) {
    return (
      <Card>
        <EmptyStateCard>선택한 조건에 맞는 배출함이 없어요.</EmptyStateCard>
      </Card>
    );
  }

  return (
    <BinList>
      {bins.map((bin) => (
        <BinCard key={bin.id} $accent={TYPE_ACCENT[bin.type]}>
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
                  <Badge tone={AVAILABILITY_TONE[bin.availability]}>
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
              <SectionLabel>수거 품목</SectionLabel>
              <AcceptedItems>
                {bin.acceptedItems.map((item) => (
                  <Badge key={item} variant="soft" tone={MATERIAL_COLORS[item] ?? "neutral"}>
                    {item}
                  </Badge>
                ))}
              </AcceptedItems>
            </div>

            <ActionButtons>
              <Button variant="outline" size="sm" style={{ flex: 1 }}>
                <Navigation size={14} />길 찾기
              </Button>
              <Button variant="outline" size="sm" style={{ flex: 1 }}>
                상태 신고
              </Button>
            </ActionButtons>
          </CardContent>
        </BinCard>
      ))}
    </BinList>
  );
}
