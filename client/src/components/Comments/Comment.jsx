import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { format } from "timeago.js";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

const Comment = ({ comment }) => {
  const [channel, setChannel] = useState({});
  const localAdd = "https://uthub-backend.onrender.com";
  useEffect(() => {
    const FetchComment = async () => {
      try {
        const channelRes = await axios.get(
          `${localAdd}/api/users/find/${comment.userId}`
        );
        setChannel(channelRes.data);
      } catch (error) {}
    };
    FetchComment();
  }, [comment.userId]);
  return (
    <Container>
      <Avatar src={channel.img} />
      <Details>
        <Name>
          {channel?.username} <Date> {format(comment?.createdAt)}</Date>
        </Name>
        <Text>{comment.desc}</Text>
      </Details>
    </Container>
  );
};

export default Comment;
