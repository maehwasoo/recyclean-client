import { useState } from "react";
import type { ReactNode } from "react";
import styled from "@emotion/styled";

const AvatarRoot = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.surfaceMuted};
  color: ${({ theme }) => theme.colors.primary};
  overflow: hidden;
`;

const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const Fallback = styled.span`
  font-size: 0.9rem;
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

interface AvatarProps {
  size?: number;
  children: ReactNode;
}

export function Avatar({ size = 48, children }: AvatarProps) {
  return (
    <AvatarRoot style={{ width: size, height: size }}>
      {children}
    </AvatarRoot>
  );
}

interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: ReactNode;
}

export function AvatarImage({ fallback, onError, ...rest }: AvatarImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return fallback ? <>{fallback}</> : null;
  }

  return (
    <AvatarImg
      {...rest}
      onError={(event) => {
        setHasError(true);
        onError?.(event);
      }}
    />
  );
}

interface AvatarFallbackProps {
  children: ReactNode;
}

export function AvatarFallback({ children }: AvatarFallbackProps) {
  return <Fallback>{children}</Fallback>;
}
