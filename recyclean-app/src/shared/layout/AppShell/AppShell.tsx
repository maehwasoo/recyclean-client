import { Outlet } from "react-router-dom";
import styled from "@emotion/styled";
import { Header } from "../Header/Header";
import { BottomNav } from "../../navigation/BottomNav/BottomNav";

const Shell = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background};
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(4)} ${({ theme }) => theme.spacing(3)}
    ${({ theme }) => theme.spacing(10)};
`;

const Content = styled.div`
  width: 100%;
  max-width: 960px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;

export function AppShell() {
  return (
    <Shell>
      <Header />
      <Main>
        <Content>
          <Outlet />
        </Content>
      </Main>
      <BottomNav />
    </Shell>
  );
}
