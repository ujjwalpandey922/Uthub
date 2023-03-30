import "./App.css";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utls/Theme";
import { useState } from "react";
import Home from "./Pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Video from "./Pages/Video";
import MiniMenu from "./components/MiniMenu";
import SignIn from "./components/SignIn";
import Search from "./components/Search";

function App() {
  const [toggleMode, setToggleMode] = useState(false);
  const [toggleSideBar, setToggleSideBar] = useState(false);
  return (
    // theme provider comes with styled components
    <ThemeProvider theme={!toggleMode ? lightTheme : darkTheme}>
      <Container className="App">
        <BrowserRouter>
          {/* menu */}
          <Menu
            toggleMode={toggleMode}
            setToggleMode={setToggleMode}
            toggleSideBar={toggleSideBar}
            setToggleSideBar={setToggleSideBar}
          />
          {/* main */}
          <Main>
            <Navbar
              toggleSideBar={toggleSideBar}
              setToggleSideBar={setToggleSideBar}
            />
            <Wrapper>
              <MiniMenu />
              <Routes>
                <Route>
                  {/* usually but dont do it */}
                  {/* <Route path="/" element={<Home />} /> */}
                  <Route path="/">
                    <Route index element={<Home type="random" />} />
                    <Route path="subs" element={<Home type="subs" />} />
                    <Route path="trending" element={<Home type="trending" />} />
                    <Route path="signin" element={<SignIn />} />
                    <Route path="search" element={<Search />} />
                    <Route path="video">
                    <Route path=":id" element={<Video />} />
                    </Route>
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;

//css using styled

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
`;
const Wrapper = styled.div`
  display: flex;
`;
