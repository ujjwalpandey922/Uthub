import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";
const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);
  // const localAdd = "http://localhost:5000"; 
  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/api/videos/${type}`, {
        headers: {
          access_token: localStorage.getItem("token"),
        },
      });
      setVideos(res.data);
    };
    fetchVideos();
  }, [type]);
  return (
    <Container>
      {videos.map((e) => (
        <Card key={e._id} video={e} />
      ))}
    </Container>
  );
};

export default Home;
const Container = styled.div`
  margin: 1rem;
  /* margin-left:7rem; */
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  overflow-y: auto;
`;
