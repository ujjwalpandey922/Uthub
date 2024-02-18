import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LogInError, LogInStar, LogInSuccess } from "../../Redux/UserSlice";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [toggleLogin, setToggleLogin] = useState(false);
  //useDispatch Hook
  const dispatch = useDispatch();

  const nav = useNavigate();
  // Log in
  const handleLogin = async () => {
    dispatch(LogInStar());
    try {
      const res = await axios.post(
        `${localAdd}/api/auth/login`,
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );
      // console.log(res.data);
      localStorage.setItem("token", res.data.token);
      dispatch(LogInSuccess(res.data.other));
      nav("/");
    } catch (error) {
      dispatch(LogInError());
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        `${localAdd}/api/auth/signup`,
        {
          username,
          password,
          email,
        },
        {
          withCredentials: true,
        }
      );
      res.status === 200 && setToggleLogin(false);
    } catch (error) {
      dispatch(LogInError());
    }
  };
  return (
    <Container>
      <Wrapper>
        <TitleBar>
          <Title onClick={() => setToggleLogin(false)}>Log in</Title>
          <Title onClick={() => setToggleLogin(true)}> Sign Up</Title>
        </TitleBar>
        {!toggleLogin && (
          <>
            <SubTitle>Continue to UThube</SubTitle>
            <Input
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleLogin}>Log In</Button>
          </>
        )}
        {toggleLogin && (
          <>
            <SubTitle>New to UThube</SubTitle>
            <Input
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleSignUp}>Sign up</Button>
          </>
        )}
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  height: calc(90vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;
const TitleBar = styled.div`
  display: flex;
  gap: 1rem;
  cursor: pointer;
`;
const Title = styled.h1`
  font-size: 24px;
  border-radius: 10px;
  padding: 0.5rem;
  color: ${({ theme }) => theme.textSoft};
  background-color: ${({ theme }) => theme.bgLight};
  :hover {
    position: relative;
    top: -5px;
  }
  :active {
    color: ${({ theme }) => theme.bgLight};
    background-color: ${({ theme }) => theme.textSoft};
  }
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.textSoft};
  color: ${({ theme }) => theme.bg};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;
