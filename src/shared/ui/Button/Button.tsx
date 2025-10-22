import { forwardRef } from "react";
import styled from "@emotion/styled";
import type { CSSObject } from "@emotion/react";
import type { AppTheme } from "../../styles/theme";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "destructive";
type ButtonSize = "md" | "sm" | "lg" | "icon";

interface ButtonStyleProps {
  $variant: ButtonVariant;
  $size: ButtonSize;
}

type VariantStyle = (theme: AppTheme) => CSSObject;
type SizeStyle = (theme: AppTheme) => CSSObject;

const variantStyles: Record<ButtonVariant, VariantStyle> = {
  primary: (theme) => ({
    backgroundColor: theme.colors.primary,
    color: theme.colors.primaryContrast,
    "&:hover": {
      backgroundColor: "#276749"
    }
  }),
  secondary: (theme) => ({
    backgroundColor: theme.colors.secondary,
    color: theme.colors.primaryContrast,
    "&:hover": {
      backgroundColor: "#0a3c58"
    }
  }),
  outline: (theme) => ({
    backgroundColor: "transparent",
    border: `1px solid ${theme.colors.border}`,
    color: theme.colors.text,
    "&:hover": {
      backgroundColor: theme.colors.surfaceMuted
    }
  }),
  ghost: (theme) => ({
    backgroundColor: "transparent",
    color: theme.colors.textMuted,
    "&:hover": {
      backgroundColor: theme.colors.surfaceMuted,
      color: theme.colors.text
    }
  }),
  destructive: (theme) => ({
    backgroundColor: theme.colors.danger,
    color: theme.colors.primaryContrast,
    "&:hover": {
      backgroundColor: "#b91c1c"
    }
  })
};

const sizeStyles: Record<ButtonSize, SizeStyle> = {
  md: (theme) => ({
    height: theme.spacing(10),
    paddingInline: theme.spacing(4),
    gap: theme.spacing(2),
    fontSize: "0.95rem"
  }),
  sm: (theme) => ({
    height: theme.spacing(8),
    paddingInline: theme.spacing(3),
    gap: theme.spacing(1.5),
    fontSize: "0.85rem"
  }),
  lg: (theme) => ({
    height: theme.spacing(12),
    paddingInline: theme.spacing(5),
    gap: theme.spacing(2.5),
    fontSize: "1rem"
  }),
  icon: (theme) => ({
    height: theme.spacing(10),
    width: theme.spacing(10),
    padding: 0,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center"
  })
};

const StyledButton = styled.button<ButtonStyleProps>(({ theme, $variant, $size }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: theme.radii.md,
  border: "none",
  fontWeight: theme.typography.weights.medium,
  transition: "background-color 0.2s ease, color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
  cursor: "pointer",
  position: "relative",
  outline: "none",
  boxShadow: theme.shadows.soft,
  textTransform: "none",
  letterSpacing: "0.01em",
  ...variantStyles[$variant](theme),
  ...sizeStyles[$size](theme),
  ":disabled": {
    opacity: 0.55,
    cursor: "not-allowed",
    boxShadow: "none"
  },
  ":focus-visible": {
    boxShadow: "0 0 0 4px rgba(34, 197, 94, 0.35)"
  }
}));

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", ...rest },
  ref
) {
  return <StyledButton ref={ref} $variant={variant} $size={size} {...rest} />;
});
