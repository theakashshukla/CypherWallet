import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  colors: {
    primary: "#3498db",
    secondary: "#2ecc71",
    background: "#1A1F26",
    text: "#333",
    sidebarBackground: "#242830",
    navbarBackground: "#1A1F26",
    sidebarBorder: "#ddd",
    border: "#A29278",
    activeMenu: "#C0996F",
    activeText: '#E0B36A'
  },
  spacing: {
    small: "8px",
    medium: "16px",
    large: "24px",
  },
  sizing: {
    small: "20px",
    medium: "32px",
    large: "64px",
  },
};

export type Theme = typeof theme;
