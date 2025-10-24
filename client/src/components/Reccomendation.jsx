import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Card from "./Card";
import { API_BASE_URL } from "../config/api";

const Container = styled.div`
  flex: 2;
`;

const Recommendation = ({ tags }) => {
  const [videos, setVideos] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`${API_BASE_URL}/api/videos/tags?tags=${tags}`);

      setVideos(res.data.filter((e) => e._id != id));
    };
    fetchVideos();
  }, [tags]);

  return (
    <Container>
      {videos.map((video) => (
        <Card type="Recommendation" key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Recommendation;
