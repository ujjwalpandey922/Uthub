import React from "react";
import { FaHome } from "react-icons/fa";
import {
  MdExplore,
  MdOutlineSubscriptions,
  MdLightMode,
  MdDarkMode,
} from "react-icons/md";
import { Link } from "react-router-dom";
import styled from "styled-components";
const MiniMenu = ({ setToggleMode, toggleMode }) => {
  return (
    <Wrapper>
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <Icons>
          <FaHome
            style={{
              margin: "0 1rem",
              fontSize: "1.5rem",
            }}
          />
          <span>Home</span>
        </Icons>
      </Link>
      <Link to="/trending" style={{ textDecoration: "none", color: "inherit" }}>
        <Icons>
          <MdExplore
            style={{
              margin: "0 1rem",
              fontSize: "1.5rem",
            }}
          />
          Explore
        </Icons>
      </Link>
      <Link to="/subs" style={{ textDecoration: "none", color: "inherit" }}>
        <Icons>
          <MdOutlineSubscriptions
            style={{
              margin: "0 1rem",
              fontSize: "1.5rem",
            }}
          />
          Subscriptions
        </Icons>
      </Link>
      <Icons onClick={() => setToggleMode(!toggleMode)}>
        {toggleMode ? (
          <>
            <MdLightMode
              style={{
                margin: "0 1rem",
                fontSize: "1.5rem",
              }}
            />{" "}
            Light
          </>
        ) : (
          <>
            <MdDarkMode
              style={{
                margin: "0 1rem",
                fontSize: "1.5rem",
              }}
            />{" "}
            Dark
          </>
        )}{" "}
        Mode
      </Icons>
    </Wrapper>
  );
};

export default MiniMenu;
const Wrapper = styled.div`
  min-width: 5rem;
  height: calc(100vh - 3rem);
  background-color: ${({ theme }) => theme.bg};
`;
const Icons = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: start;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 1.5rem 0;
  /* padding: 1rem 0.5rem; */
  :hover {
    background-color: #80808044;
    border-radius: 10px;
  }
  svg {
    font-size: 20px;
  }
`;
