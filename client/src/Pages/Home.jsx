import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);
  const history = useNavigate();
  const localAdd = "https://uthub-backend.onrender.com";
  useEffect(() => {
    const fetchVideos = async () => {
      const token = localStorage.getItem("token");
      if (!token && type === "subs") {
        // Redirect to login if token is not available
        history("/signin");
        return;
      }
      try {
        const res = await axios.get(`${localAdd}/api/videos/${type}`, {
          headers: {
            access_token: token,
          },
        });
        setVideos(res.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
        // Optionally handle the error, e.g., redirect to login if token is invalid
        if (error.response && error.response.status === 401) {
          // Unauthorized, redirect to login
          history.push("/login");
        }
      }
    };
    fetchVideos();
  }, [type]);
  return (
    <Container>
      {videos.length > 0 ? (
        videos.map((e) => <Card key={e._id} video={e} />)
      ) : (
        <Loading />
      )}
    </Container>
  );
};

export default Home;
const Container = styled.div`
  margin: 1rem;
  // padding:1rem;
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  overflow-y: auto;
  justify-content: center;
  width: 100%;
`;
