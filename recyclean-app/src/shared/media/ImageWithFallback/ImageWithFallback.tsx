import { useState } from "react";
import styled from "@emotion/styled";

const ErrorContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.surfaceMuted};
  color: ${({ theme }) => theme.colors.textMuted};
  width: 100%;
  height: 100%;
  border-radius: inherit;
`;

const FallbackIcon = styled.span`
  font-size: 1.5rem;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackIcon?: React.ReactNode;
}

export function ImageWithFallback({
  onError,
  fallbackIcon = "🖼️",
  ...rest
}: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false);

  if (didError) {
    return (
      <ErrorContainer>
        <FallbackIcon>{fallbackIcon}</FallbackIcon>
      </ErrorContainer>
    );
  }

  return (
    <StyledImage
      {...rest}
      onError={(event) => {
        setDidError(true);
        onError?.(event);
      }}
    />
  );
}
