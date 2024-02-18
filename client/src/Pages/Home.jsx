import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";
import Loading from "../components/Loading";
const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);
  const localAdd = "https://uthub-backend.onrender.com" ;
  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`${localAdd}/api/videos/${type}`, {
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
      {videos ? videos.map((e) => <Card key={e._id} video={e} />) : <Loading />}
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
`;
