import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LogInError, LogInStar, LogInSuccess } from "../../Redux/UserSlice";
import { API_BASE_URL } from "../config/api";
import toast, { Toaster } from 'react-hot-toast';

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [toggleLogin, setToggleLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const nav = useNavigate();

  // Log in
  const handleLogin = async () => {
    if (!username || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    dispatch(LogInStar());
    
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );
      
      localStorage.setItem("token", res.data.token);
      dispatch(LogInSuccess(res.data.other));
      toast.success(`Welcome back, ${username}!`);
      
      setTimeout(() => {
        nav("/");
      }, 1000);
    } catch (error) {
      dispatch(LogInError());
      const errorMessage = error.response?.data?.message || "Login failed. Please check your credentials.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!username || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/auth/signup`,
        {
          username,
          password,
          email,
        },
        {
          withCredentials: true,
        }
      );
      
      if (res.status === 200) {
        toast.success("Account created successfully! Please log in.");
        setToggleLogin(false);
        setPassword("");
      }
    } catch (error) {
      dispatch(LogInError());
      const errorMessage = error.response?.data?.message || "Sign up failed. Username or email might already exist.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      toggleLogin ? handleSignUp() : handleLogin();
    }
  };

  return (
    <Container>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#4CAF50',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#f44336',
              secondary: '#fff',
            },
          },
        }}
      />
      
      <Wrapper>
        <Logo>
          <svg width="40" height="40" viewBox="0 0 90 90" fill="none">
            <path d="M0 12.5C0 5.59644 5.59644 0 12.5 0H77.5C84.4036 0 90 5.59644 90 12.5V77.5C90 84.4036 84.4036 90 77.5 90H12.5C5.59644 90 0 84.4036 0 77.5V12.5Z" fill="#FF0000"/>
            <path d="M60 45L35 60V30L60 45Z" fill="white"/>
          </svg>
          <LogoText>UThube</LogoText>
        </Logo>

        <TitleBar>
          <TabButton 
            active={!toggleLogin} 
            onClick={() => setToggleLogin(false)}
          >
            Sign In
          </TabButton>
          <TabButton 
            active={toggleLogin} 
            onClick={() => setToggleLogin(true)}
          >
            Sign Up
          </TabButton>
        </TitleBar>

        <FormContainer>
          {!toggleLogin ? (
            <>
              <SubTitle>Welcome back to UThube</SubTitle>
              <InputGroup>
                <Label>Username</Label>
                <Input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                />
              </InputGroup>
              <InputGroup>
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                />
              </InputGroup>
              <Button onClick={handleLogin} disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </>
          ) : (
            <>
              <SubTitle>Join UThube today</SubTitle>
              <InputGroup>
                <Label>Username</Label>
                <Input
                  type="text"
                  placeholder="Choose a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                />
              </InputGroup>
              <InputGroup>
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                />
              </InputGroup>
              <InputGroup>
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="Create a password (min 6 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                />
              </InputGroup>
              <Button onClick={handleSignUp} disabled={loading}>
                {loading ? "Creating account..." : "Sign Up"}
              </Button>
            </>
          )}
        </FormContainer>
      </Wrapper>

      <More>
        English (USA)
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
  justify-content: center;
  min-height: calc(100vh - 56px);
  padding: 2rem;
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 12px;
  padding: 40px 50px;
  gap: 20px;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
`;

const LogoText = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin: 0;
`;

const TitleBar = styled.div`
  display: flex;
  gap: 0;
  width: 100%;
  border-bottom: 2px solid ${({ theme }) => theme.soft};
  margin-bottom: 10px;
`;

const TabButton = styled.button`
  flex: 1;
  font-size: 18px;
  font-weight: 600;
  padding: 12px 20px;
  cursor: pointer;
  background: transparent;
  border: none;
  color: ${({ theme, active }) => (active ? theme.text : theme.textSoft)};
  border-bottom: 3px solid ${({ theme, active }) => (active ? '#FF0000' : 'transparent')};
  transition: all 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.soft}22;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  color: ${({ theme }) => theme.textSoft};
  margin: 0;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  border: 2px solid ${({ theme }) => theme.soft};
  border-radius: 8px;
  padding: 12px 16px;
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  font-size: 15px;
  color: ${({ theme }) => theme.text};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #FF0000;
    box-shadow: 0 0 0 3px rgba(255, 0, 0, 0.1);
  }

  &::placeholder {
    color: ${({ theme }) => theme.textSoft};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Button = styled.button`
  border-radius: 8px;
  border: none;
  padding: 14px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  background-color: #FF0000;
  color: white;
  margin-top: 10px;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #CC0000;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 0, 0, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const More = styled.div`
  display: flex;
  margin-top: 20px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.text};
    text-decoration: underline;
  }
`;
