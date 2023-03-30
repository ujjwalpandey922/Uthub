import React, { useState } from "react";
import { AiFillYoutube, AiOutlineSearch } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import { FiLogIn } from "react-icons/fi";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiFillVideoCamera } from "react-icons/ai";
import UploadVideo from "./UploadVideo";
import { LogOut } from "../../Redux/UserSlice";
const Navbar = ({ toggleSideBar, setToggleSideBar }) => {
  // to use redux use Selector hook
  const { currentUser } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const nav = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.clear();
    dispatch(LogOut());
  };
  return (
    <>
      <Container>
        <Wrapper>
          <Logo>
            <RxHamburgerMenu
              style={{
                fontSize: "1.5rem",
                marginRight: ".5rem",
                cursor: "pointer",
              }}
              onClick={() => setToggleSideBar(!toggleSideBar)}
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
          <Search>
            <Input
              placeholder=" Search "
              onChange={(e) => setQ(e.target.value)}
            />
            <AiOutlineSearch
              style={{
                margin: " 0 1rem",
                fontSize: "1.5rem",
                cursor: "pointer",
              }}
              onClick={() => nav(`/search?q=${q}`)}
            />
          </Search>
          {currentUser ? (
            <User>
              <AiFillVideoCamera
                style={{
                  margin: " 0 1rem",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                }}
                onClick={() => setOpen(true)}
              />
              <UserInfo onClick={handleLogout}>
                <Avatar src={currentUser.img} />
                {currentUser.username}
              </UserInfo>
            </User>
          ) : (
            <Link
              to="/signin"
              style={{
                textDecoration: "none",

                color: "inherit",
              }}
            >
              <Button>
                {" "}
                <FiLogIn />
                SIGN IN
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {open && <UploadVideo setOpen={setOpen} />}
    </>
  );
};

export default Navbar;

const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: ${({ theme }) => theme.bg};
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0.5rem;
`;
const Search = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 50px;
  width: 50%;
`;
const Logo = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;
const Input = styled.input`
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  padding-left: 1rem;
  border: none;

  outline: none;
  height: 30px;
  width: 100%;
`;
const Button = styled.button`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  border: 1px solid #10b3cd;
  color: #10b3cd;
  margin: 0.5rem;
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
  cursor: pointer;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: 0 50%;

  color: ${({ theme }) => theme.text};

  cursor: pointer;
  :hover {
    background: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.bg};
   
  }
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #1e0303a8;
`;
