import { forwardRef } from "react";
import type { ReactNode } from "react";
import styled from "@emotion/styled";

const FieldWrapper = styled.label`
  position: relative;
  display: inline-flex;
  width: 100%;
  align-items: center;
`;

const StyledInput = styled.input<{ $hasIcon: boolean }>`
  width: 100%;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme, $hasIcon }) =>
    `${theme.spacing(3)} ${theme.spacing(3)} ${theme.spacing(3)} ${
      $hasIcon ? `calc(${theme.spacing(3)} + 28px)` : theme.spacing(3)
    }`};
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.25);
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const IconSlot = styled.span`
  position: absolute;
  left: ${({ theme }) => theme.spacing(3)};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textMuted};
`;

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: ReactNode;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { startIcon, ...rest },
  ref
) {
  return (
    <FieldWrapper>
      {startIcon && <IconSlot>{startIcon}</IconSlot>}
      <StyledInput ref={ref} $hasIcon={Boolean(startIcon)} {...rest} />
    </FieldWrapper>
  );
});
