import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Comment from "./Comment";

const Comments = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");

  const { currentUser } = useSelector((state) => state.user);
  const localAdd = "https://uthub-backend.onrender.com";
  useEffect(() => {
    const FetchComments = async () => {
      try {
        const res = await axios.get(`${localAdd}/api/comments/${videoId}`);
        setComments(res.data);
      } catch (error) {}
    };
    FetchComments();
  }, [videoId]);
  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser?.img} />
        <Input
          placeholder="Add a comment..."
          onChange={(e) => setCommentInput(e.target.value)}
        />
        <FocusInput>
          {/* <div>SmiLE</div>
          <div>
            <button>Cancle</button>
            <button>Comment</button>
          </div> */}
        </FocusInput>
      </NewComment>
      {comments.map((e) => (
        <Comment key={e._id} comment={e} />
      ))}
    </Container>
  );
};

export default Comments;
const Container = styled.div`
  margin: 1rem 0 2rem 0;
`;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const FocusInput = styled.span`
  display: flex;
`;
const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
  ${FocusInput} {
    background-color: red;
  }
  :focus {
    border-bottom: 2px solid black;
  }
`;
