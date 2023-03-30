import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { format } from "timeago.js";
const Card = ({ type, video }) => {
  const [channel, setChannel] = useState({});
  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(
        `/api/users/find/${video.userId}`
      );
      setChannel(res.data);
    };
    fetchChannel();
  }, [video.userId]);
  // console.log(video)
  return (
    <Link
      to={`/video/${video._id}`}
      style={{ textDecoration: "none", cursor: "pointer" }}
    >
      <Container type={type}>
        <Image type={type} src={video.imgUrl} />
        <Details type={type}>
          <ChannelImage type={type} src={channel.img} />
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{channel.username}</ChannelName>
            <Info>
              {video.views} views • {format(video.createdAt)}
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;

const Container = styled.div`
  width: ${({ type }) => (type === "Recommendation" ? "100%" : "270px")};
  margin-bottom: ${({ type }) => type === "Recommendation" && "1rem"};
  cursor: pointer;
  display: ${({ type }) => type === "Recommendation" && "flex"};
`;

const Image = styled.img`
  width: ${({ type }) => (type === "Recommendation" ? "150px" : "100%")};
  height: ${({ type }) => (type === "Recommendation" ? "100px" : "150px")};
  background-color: grey;
  border-radius: 10px;
  flex: 1;
  object-fit: cover;
`;

const ChannelImage = styled.img`
  width: 35px;
  height: 35px;
  background-color: grey;
  border-radius: 50%;
  display: ${({ type }) => type === "Recommendation" && "none"};
`;
const Details = styled.div`
  display: flex;
  margin-top: ${({ type }) => (type === "Recommendation" ? "0" : ".5rem")};
  margin-left: 0.5rem;
  gap: 0.5rem;
  flex: 1;
`;
const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin-top: 9px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;
const Texts = styled.div``;
