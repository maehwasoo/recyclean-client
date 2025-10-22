import { forwardRef } from "react";
import styled from "@emotion/styled";

interface SwitchProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const SwitchRoot = styled.button<{ $checked: boolean }>`
  position: relative;
  width: 44px;
  height: 24px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: none;
  padding: 0;
  cursor: pointer;
  background-color: ${({ theme, $checked }) =>
    $checked ? theme.colors.primary : theme.colors.border};
  transition: background-color 0.2s ease;
  display: inline-flex;
  align-items: center;
  outline: none;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.35);
  }
`;

const Thumb = styled.span<{ $checked: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  transform: translateX(${({ $checked }) => ($checked ? "20px" : "4px")});
  transition: transform 0.2s ease;
`;

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  { checked, onCheckedChange, disabled, ...rest },
  ref
) {
  return (
    <SwitchRoot
      ref={ref}
      role="switch"
      aria-checked={checked}
      $checked={checked}
      disabled={disabled}
      onClick={(event) => {
        rest.onClick?.(event);
        if (event.defaultPrevented) return;
        onCheckedChange?.(!checked);
      }}
      {...rest}
    >
      <Thumb $checked={checked} />
    </SwitchRoot>
  );
});
