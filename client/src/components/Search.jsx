import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";



const Search = () => {
  const [videos, setVideos] = useState([]);
  const query = useLocation().search;
  const localAdd = "http://localhost:5000";
  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`${localAdd}/api/videos/search${query}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [query]);

  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Search;
const Container = styled.div`
  margin: 1rem;
  // padding:1rem;
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  overflow-y: auto;
  justify-content: center;
`;
