import React from "react";
import { FaHistory, FaHome } from "react-icons/fa";
import { ImLibrary } from "react-icons/im";
import { MdExplore, MdOutlineSubscriptions } from "react-icons/md";
import { Link } from "react-router-dom";
import styled from "styled-components";
const MiniMenu = () => {
  return (
    <Wrapper>
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <Icons>
          <FaHome />
          <span>Home</span>
        </Icons>
      </Link>
      <Link to="/trending" style={{ textDecoration: "none", color: "inherit" }}>
        <Icons>
          <MdExplore />
          Explore
        </Icons>
      </Link>
      <Link to="/subs" style={{ textDecoration: "none", color: "inherit" }}>
        <Icons>
          <MdOutlineSubscriptions />
          Subscriptions
        </Icons>
      </Link>
      <Icons>
        <ImLibrary />
        Library
      </Icons>
      <Icons>
        <FaHistory />
        History
      </Icons>
    </Wrapper>
  );
};

export default MiniMenu;
const Wrapper = styled.div`
  min-width: 5rem;

  height: 90vh;
  background-color: ${({ theme }) => theme.bg};
`;
const Icons = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: start;
  font-size: 12px;
  cursor: pointer;
  padding: 1.5rem 0;
  /* padding: 1rem 0.5rem; */
  &:hover {
    background-color: #80808044;
    border-radius: 10px;
  }
  svg {
    font-size: 20px;
  }
`;
