import type { ComponentType } from "react";
import { Camera, Home, MapPin, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import styled from "@emotion/styled";

interface NavItem {
  to: string;
  label: string;
  icon: ComponentType<{ size?: number }>;
}

const NavBar = styled.nav`
  position: sticky;
  bottom: 0;
  z-index: 90;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(14px);
`;

const NavInner = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(4)}`};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const NavButton = styled(NavLink)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  text-decoration: none;
  transition: background-color 0.2s ease, color 0.2s ease;

  &.active {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.surfaceMuted};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.surfaceMuted};
  }
`;

const navItems: NavItem[] = [
  { to: "/", label: "홈", icon: (props) => <Home {...props} /> },
  { to: "/analyze", label: "분석", icon: (props) => <Camera {...props} /> },
  { to: "/map", label: "지도", icon: (props) => <MapPin {...props} /> },
  { to: "/settings", label: "설정", icon: (props) => <Settings {...props} /> }
];

export function BottomNav() {
  return (
    <NavBar>
      <NavInner>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavButton key={item.to} to={item.to} end={item.to === "/"}>
              <Icon size={20} />
              {item.label}
            </NavButton>
          );
        })}
      </NavInner>
    </NavBar>
  );
}
