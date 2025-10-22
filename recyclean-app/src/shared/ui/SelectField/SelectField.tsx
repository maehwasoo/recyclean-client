import { forwardRef } from "react";
import styled from "@emotion/styled";

export interface SelectOption<T extends string> {
  value: T;
  label: string;
}

export interface SelectFieldProps<T extends string>
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  options: SelectOption<T>[];
  placeholder?: string;
}

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledSelect = styled.select`
  appearance: none;
  width: 100%;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => `${theme.spacing(3)} ${theme.spacing(5)} ${theme.spacing(3)} ${theme.spacing(3)}`};
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.25);
    outline: none;
  }
`;

const Chevron = styled.span`
  position: absolute;
  right: ${({ theme }) => theme.spacing(2)};
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.95rem;
`;

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps<string>>(function SelectField(
  { options, placeholder, value, defaultValue, ...rest },
  ref
) {
  return (
    <SelectWrapper>
      <StyledSelect ref={ref} value={value} defaultValue={defaultValue} {...rest}>
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
      <Chevron>▾</Chevron>
    </SelectWrapper>
  );
});
