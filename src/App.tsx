import styled, { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./state";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const Content = styled.div`
  flex-grow: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.large};
  margin: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppContainer>
          <Navbar />
          <ContentWrapper>
            <Sidebar />
            <Content>
              <Outlet />
            </Content>
          </ContentWrapper>
        </AppContainer>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
