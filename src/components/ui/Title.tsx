import React from "react";
import styled from "styled-components";

const StyledTitle = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.activeText};
  text-align: left;
  margin: 20px 0;
  font-weight: bold;
  line-height: 1.2;
`;

interface TitleProps {
  children: React.ReactNode; // Accept children as props
}

const Title: React.FC<TitleProps> = ({ children }) => {
  return <StyledTitle>{children}</StyledTitle>; // Render children inside the styled component
};

export default Title;
