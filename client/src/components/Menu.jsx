import React, { useState } from "react";
import styled from "styled-components";
import { AiFillYoutube, AiFillSetting } from "react-icons/ai";
import { FaHome, FaHistory, FaMusic, FaGamepad } from "react-icons/fa";
import { ImLibrary } from "react-icons/im";
import { FiLogIn } from "react-icons/fi";
import { MdLightMode, MdLocalMovies } from "react-icons/md";
import { BiNews, BiHelpCircle } from "react-icons/bi";
import { RiLiveLine } from "react-icons/ri";
import { GoReport } from "react-icons/go";
import {
  MdExplore,
  MdOutlineSubscriptions,
  MdSportsVolleyball,
  MdDarkMode,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { useSelector } from "react-redux";
const Menu = ({
  toggleMode,
  setToggleMode,
  setToggleSideBar,
  toggleSideBar,
}) => {
  const handleClick = () => {
    setToggleSideBar(!toggleSideBar);
  };
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      {toggleSideBar && (
        <Main>
          <Container className="slide-in-left">
            <Logo>
              <RxHamburgerMenu
                style={{
                  fontSize: "1.5rem",
                  marginRight: ".5rem",
                  cursor: "pointer",
                }}
                onClick={handleClick}
              />
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  color: "inherit",
                }}
              >
                <AiFillYoutube style={{ color: "red", fontSize: "1.5rem" }} />
                <span> Uthub </span>
              </Link>
            </Logo>
            <Wrapper>
              <Icons>
                <FaHome />
                <span>Home</span>
              </Icons>
              <Icons>
                <MdExplore />
                Explore
              </Icons>
              <Icons>
                <MdOutlineSubscriptions />
                Subscriptions
              </Icons>
              <Hr />
              <Icons>
                <ImLibrary />
                Library
              </Icons>
              <Icons>
                <FaHistory />
                History
              </Icons>
              <Hr />
              {!currentUser && (
                <>
                  <Login>
                    <Link to="/signin" style={{ textDecoration: "none" }}>
                      <Button>
                        <FiLogIn />
                        SIGN IN
                      </Button>
                    </Link>
                  </Login>
                  <Hr />
                </>
              )}

              <Icons>
                <FaMusic />
                Music
              </Icons>
              <Icons>
                <MdSportsVolleyball />
                Sports
              </Icons>
              <Icons>
                <FaGamepad />
                Gaming
              </Icons>
              <Icons>
                <MdLocalMovies />
                Movies
              </Icons>
              <Icons>
                <BiNews />
                News
              </Icons>
              <Icons>
                <RiLiveLine />
                Live
              </Icons>
              <Hr />
              <Icons>
                <AiFillSetting />
                Settings
              </Icons>
              <Icons>
                <GoReport />
                Report
              </Icons>
              <Icons>
                <BiHelpCircle />
                Help
              </Icons>
              <Icons onClick={() => setToggleMode(!toggleMode)}>
                {toggleMode ? (
                  <>
                    <MdLightMode /> Light
                  </>
                ) : (
                  <>
                    <MdDarkMode /> Dark
                  </>
                )}{" "}
                Mode
              </Icons>
            </Wrapper>
          </Container>
        </Main>
      )}
    </>
  );
};

export default Menu;
const Main = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: #00000052;
  z-index: 1000;
  .slide-in-left {
    -webkit-animation: slide-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
      both;
    animation: slide-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }
  @-webkit-keyframes slide-in-left {
    0% {
      -webkit-transform: translateX(-1000px);
      transform: translateX(-1000px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slide-in-left {
    0% {
      -webkit-transform: translateX(-1000px);
      transform: translateX(-1000px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
const Container = styled.div`
  width: 240px;
  padding: 0 0.5rem;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
  z-index: 5;
`;
const Wrapper = styled.div`
  padding: 0 0.5rem;
`;
const Icons = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 1rem;
  cursor: pointer;

  padding: 1rem 0.5rem;
  &:hover {
    background-color: #80808044;
    border-radius: 10px;
  }
`;
const Logo = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  position: sticky;
  top: 0;
  padding-top: 0.75rem;
  height: 40px;
  background-color: ${({ theme }) => theme.bg};
`;
const Hr = styled.hr`
  border: 1px solid ${({ theme }) => theme.soft};
  margin: ".5rem 0";
`;

const Login = styled.div``;
const Button = styled.div`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  border: 1px solid #10b3cd;
  color: #10b3cd;
  margin: 0.5rem 0;
  cursor: pointer;

  :hover {
    color: #333;
    background-color: #10b3cd;
  }
`;
const User = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${({ theme }) => theme.text};
`;
const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #1e0303a8;
`;
