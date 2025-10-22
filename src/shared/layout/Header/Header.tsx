import { Recycle, User } from "lucide-react";
import styled from "@emotion/styled";
import { Button } from "../../ui/Button/Button";

const HeaderBar = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.9);
`;

const HeaderInner = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(4)};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  color: ${({ theme }) => theme.colors.text};
`;

const BrandTitle = styled.h1`
  margin: 0;
  font-size: 1.1rem;
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

export function Header() {
  return (
    <HeaderBar>
      <HeaderInner>
        <Brand>
          <Recycle size={24} color="#2f855a" />
          <BrandTitle>EcoTracker</BrandTitle>
        </Brand>
        <Button variant="ghost" size="icon" aria-label="사용자 메뉴 열기">
          <User size={20} />
        </Button>
      </HeaderInner>
    </HeaderBar>
  );
}
