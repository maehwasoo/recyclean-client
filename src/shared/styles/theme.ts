export interface AppTheme {
  colors: {
    background: string;
    surface: string;
    surfaceMuted: string;
    primary: string;
    primaryContrast: string;
    secondary: string;
    accent: string;
    text: string;
    textMuted: string;
    border: string;
    success: string;
    successSurface: string;
    warning: string;
    warningSurface: string;
    danger: string;
    dangerSurface: string;
    info: string;
    infoSurface: string;
    highlight: string;
  };
  spacing: (step: number) => string;
  radii: {
    sm: string;
    md: string;
    lg: string;
    pill: string;
  };
  shadows: {
    soft: string;
    medium: string;
    inner: string;
  };
  typography: {
    family: string;
    weights: {
      regular: number;
      medium: number;
      semibold: number;
      bold: number;
    };
  };
}

export const appTheme: AppTheme = {
  colors: {
    background: "#f5f7fa",
    surface: "#ffffff",
    surfaceMuted: "#f0f4f8",
    primary: "#2f855a",
    primaryContrast: "#ffffff",
    secondary: "#0c4a6e",
    accent: "#14b8a6",
    text: "#1f2933",
    textMuted: "#4a5568",
    border: "#d1d9e0",
    success: "#15803d",
    successSurface: "#dcfce7",
    warning: "#b45309",
    warningSurface: "#fef3c7",
    danger: "#dc2626",
    dangerSurface: "#fee2e2",
    info: "#2563eb",
    infoSurface: "#dbeafe",
    highlight: "#22c55e",
  },
  spacing: (step: number) => `${step * 4}px`,
  radii: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    pill: "999px",
  },
  shadows: {
    soft: "0 4px 16px rgba(15, 23, 42, 0.08)",
    medium: "0 12px 32px rgba(15, 23, 42, 0.12)",
    inner: "inset 0 1px 2px rgba(15, 23, 42, 0.08)",
  },
  typography: {
    family: "'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
};

declare module "@emotion/react" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Theme extends AppTheme {}
}
