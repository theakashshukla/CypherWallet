import styled from "styled-components";

const SidebarContainer = styled.aside`
  width: 240px;
  height: 80vh;
  background-color: ${({ theme }) => theme.colors.sidebarBackground};
  margin: 30px 10px 10px 30px; /* Margin around Sidebar, top margin adjusted to be below Navbar */
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacing.medium};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const SidebarItem = styled.div`
  margin: ${({ theme }) => theme.spacing.medium} 0;
  padding: ${({ theme }) => theme.spacing.medium};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: #fff;
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarItem>Wallets</SidebarItem>
      <SidebarItem>Transactions</SidebarItem>
    </SidebarContainer>
  );
};

export default Sidebar;
