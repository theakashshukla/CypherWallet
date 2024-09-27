import styled from "styled-components";
import { Link, useLocation } from "react-router-dom"; // Import Link for routing
import { Icon } from "./Icon"; // Ensure your icons are imported properly

const SidebarContainer = styled.aside`
  width: 260px;
  height: 80vh;
  background-color: ${({ theme }) => theme.colors.sidebarBackground};
  margin: 30px 10px 10px 30px;
  padding-top: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Border = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  margin: 0 15px;
`;

const SidebarItem = styled(Link)`
  display: flex;
  align-items: center;
  margin: ${({ theme }) => theme.spacing.large} 0;
  padding-left: 30px;
  height: 40px;
  text-decoration: none;
  color: inherit; /* Inherit color from parent */
  cursor: pointer;
  position: relative;
  color: ${({ theme }) => theme.colors.active};
  &:hover {
    text-color: ${({ theme }) => theme.colors.activeText};
    color: #fff;
  }

  /* Style for active item */
  &.active {
    border-left: 4px solid ${({ theme }) => theme.colors.activeMenu};
    color: ${({ theme }) => theme.colors.activeText};
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20%;
  height: 30px;
  width: 30px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.active};
`;
const Sidebar = () => {
  const location = useLocation();
  const menuItems = [
    { name: "Wallets", path: "/", icon: <Icon.wallet size={18} /> }, // Replace <Icon.wallet /> with your actual icon component
    {
      name: "Transactions",
      path: "/transactions",
      icon: <Icon.transaction size={18} />,
    }, // Replace <Icon.transaction /> with your actual icon component
  ];
  return (
    <SidebarContainer>
      {menuItems.map((item) => (
        <>
          <SidebarItem
            key={item.name}
            to={item.path}
            className={location.pathname === item.path ? "active" : ""}
          >
            <IconContainer>{item.icon}</IconContainer>
            <span style={{ marginLeft: "20px" }}>{item.name}</span>
          </SidebarItem>
          <Border />
        </>
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;
