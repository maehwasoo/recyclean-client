import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { appTheme } from "./shared/styles/theme";
import { AppShell } from "./shared/layout/AppShell/AppShell";
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { AnalyzePage } from "./pages/analyze/AnalyzePage";
import { MapPage } from "./pages/map/MapPage";
import { SettingsPage } from "./pages/settings/SettingsPage";

export function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/analyze" element={<AnalyzePage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
