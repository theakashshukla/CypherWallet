import styled from "styled-components";
import { Icon } from "./Icon";

const NavbarContainer = styled.nav`
  width: 100vw;
  height: 70px;
  background-color: ${({ theme }) => theme.colors.navbarBackground};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${({ theme }) => theme.spacing.medium};
  box-sizing: border-box; 
  color: #fff;
  overflow: hidden; 
`;

const Logo = styled.img`
  margin-left: 30px;
  width: 100px;
  height: auto; 
  object-fit: contain; 
`;


const NavItems = styled.ul`
  list-style: none;
  margin-right: 30px;
  font-size: ${({ theme }) => theme.sizing.small};
  display: flex;
  color: ${({ theme }) => theme.colors.activeText};
  gap: ${({ theme }) => theme.spacing.medium};
`;

const NavItem = styled.li`
  cursor: pointer;
  display: flex; 
  align-items: center; 
  gap: 8px; 
  &:hover {
    opacity: 0.8;
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <Logo src="/cysunc.png" />
      <NavItems>
        <NavItem>
          <Icon.sync size={18} /> <span>Synced</span>
        </NavItem>
      </NavItems>
    </NavbarContainer>
  );
};

export default Navbar;
