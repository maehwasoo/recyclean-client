import styled from "@emotion/styled";

export const Separator = styled.hr`
  border: none;
  height: 1px;
  width: 100%;
  background: ${({ theme }) => theme.colors.border};
  margin: ${({ theme }) => theme.spacing(3)} 0;
`;
