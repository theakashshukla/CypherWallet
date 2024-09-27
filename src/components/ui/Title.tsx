import React from 'react';
import styled from 'styled-components';

// Create a styled component for the title
const StyledTitle = styled.h1`
  font-size: 2.5rem; /* Default font size */
  color: ${({ theme }) => theme.colors.activeText}; /* Use theme's primary text color */
  text-align: left; /* Default alignment */
  margin: 20px 0; /* Default margin */
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
