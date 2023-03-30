import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";
import { RiShareForwardLine } from "react-icons/ri";
import { FiMoreHorizontal } from "react-icons/fi";
import Comments from "../components/Comments/Comments";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FetchSuccess, Like, DisLike } from "../../Redux/VideoSlice";
import { format } from "timeago.js";
import { subscription } from "../../Redux/UserSlice";
import Recommendation from "../components/Reccomendation";

const Video = () => {
  const [channel, setChannel] = useState({});
  const dispatch = useDispatch();
  const { id } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  // const localAdd = "http://localhost:5000"; 
  //if we use useState liking and disliking wont happen in the same click so we make a slice
  // const [videoc, setVideoc] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.put(
          `/api/videos/find/${id}`
        );
        const channelRes = await axios.get(
          `/api/users/find/${videoRes.data.userId}`
        );
        // setVideoc(videoRes.data);
        // console.log(channelRes, videoRes);
        setChannel(channelRes.data);
        dispatch(FetchSuccess(videoRes.data));
      } catch (error) {}
    };
    fetchData();
    console.log(currentUser);
    // currentUser?.subscribedUsers.includes(channel._id);
  }, [id, dispatch]);

  const handleLike = async () => {
    await fetch(`/api/users/like/${currentVideo._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.getItem("token"),
      },
    });
    dispatch(Like(currentUser._id));
  };
  const handleDisLike = async () => {
    await fetch(`/api/users/dislike/${currentVideo._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.getItem("token"),
      },
    });
    dispatch(DisLike(currentUser._id));
  };
  const handleSub = async () => {
    await fetch(`/api/users/sub/${channel._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.getItem("token"),
      },
    });
    dispatch(subscription(channel._id));
  };
  const handleUnSub = async () => {
    await fetch(`/api/users/unsub/${channel._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.getItem("token"),
      },
    });
    dispatch(subscription(channel._id));
  };
  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo?.videoUrl} controls />
        </VideoWrapper>
        <VideoTitle>{currentVideo?.title}</VideoTitle>
        <VideoDetails>
          <Info>
            {currentVideo?.views} views • {format(currentVideo?.createdAt)}{" "}
          </Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo?.likes.includes(currentUser?._id) ? (
                <AiFillLike />
              ) : (
                <AiOutlineLike />
              )}
              {currentVideo?.likes.length} Like
            </Button>

            <Button onClick={handleDisLike}>
              {currentVideo?.dislikes.includes(currentUser?._id) ? (
                <AiFillDislike />
              ) : (
                <AiOutlineDislike />
              )}
              {currentVideo?.dislikes.length} DisLike
            </Button>
            <Button>
              <RiShareForwardLine /> Share
            </Button>
            <Button>
              <FiMoreHorizontal /> More
            </Button>
          </Buttons>
        </VideoDetails>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel?.img} />
            <ChannelDetail>
              <ChannelName>{channel?.username}</ChannelName>
              <ChannelCounter>
                {channel?.subscribers} subscribers
              </ChannelCounter>
              <Description>{channel?.desc}</Description>
            </ChannelDetail>
          </ChannelInfo>

          {currentUser?.subscribedUsers.includes(channel._id) ? (
            <Subscribed onClick={handleUnSub}> SUBSCRIBED </Subscribed>
          ) : (
            <Subscribe onClick={handleSub}> SUBSCRIBE </Subscribe>
          )}
        </Channel>
        <Hr />
        <Comments videoId={currentVideo?._id} />
      </Content>
      <Recommendation tags={currentVideo?.tags} />
    </Container>
  );
};

export default Video;

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 3rem;
`;
const Content = styled.div`
  flex: 5;
`;

const VideoWrapper = styled.div``;
const VideoTitle = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;
const VideoDetails = styled.p`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Info = styled.div`
  color: ${({ theme }) => theme.textSoft};
`;
const VideoIcons = styled.span``;
const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;
const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;
const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;
const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;
const Subscribed = styled.button`
  background-color: #525050;
  font-weight: 500;
  color: #e9dcdc;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;
const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
  position: relative;
  z-index: 1;
`;
