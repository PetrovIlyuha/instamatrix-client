import { useEffect, useState } from "react";
import Picker from "emoji-picker-react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import {
  CommentCount,
  CommentHashtagLink,
  Comments,
  CommentWord,
} from "../photo/PhotoStyles";
import SingleComment from "./SingleComment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile } from "@fortawesome/free-regular-svg-icons";
import cogoToast from "cogo-toast";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { PHOTO_FEED_QUERY } from "../../screens/Home";

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $content: String!) {
    createComment(photoId: $photoId, content: $content) {
      ok
      error
    }
  }
`;

const CommentBlock = ({ photo, page }) => {
  const [activelyShownComments, setActivelyShownComments] = useState(
    photo.comments.slice(0, 7).filter((_, i) => i % 2 !== 0)
  );
  const [_, setAllCommentsShown] = useState(false);
  const [createCommentMutation, { loading, data }] = useMutation(
    CREATE_COMMENT_MUTATION,
    {
      refetchQueries: [{ query: PHOTO_FEED_QUERY, variables: { page } }],
    }
  );
  const { register, getValues, formState, handleSubmit, setValue } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (_, emojiObject) => {
    setShowPicker(false);
    setValue("comment", getValues("comment") + emojiObject.emoji);
  };

  const showAllComments = () => {
    setActivelyShownComments(photo.comments);
    setAllCommentsShown(true);
  };

  const createComment = async () => {
    if (!formState.isDirty) return;
    if (loading) return;
    if (Object.keys(formState.errors).length) {
      switch (formState.errors.comment.type) {
        case "minLength":
          cogoToast.error("Comment is too short");
          return;
        case "maxLength":
          cogoToast.error("Comment is too long...");
          return;
        case "required":
          cogoToast.error("Comment is empty!");
          return;
      }
    } else {
      createCommentMutation({
        variables: { photoId: photo.id, content: getValues("comment") },
      });
      setValue("comment", "");
      cogoToast.success("Comment was added 🎸");
    }
  };
  return (
    <Comments>
      <SingleComment author={photo.user}>
        {photo.caption.split(" ").map((word, idx) => {
          const isHashtag = word.startsWith("#");
          return isHashtag ? (
            <CommentHashtagLink to="/hashtag" key={idx}>
              <CommentWord isHashtag={isHashtag}>{word}</CommentWord>
            </CommentHashtagLink>
          ) : (
            <CommentWord key={idx} isHashtag={isHashtag}>
              {" "}
              {word}{" "}
            </CommentWord>
          );
        })}
      </SingleComment>
      {activelyShownComments.length !== photo.comments.length && (
        <CommentCount>
          {photo.comments.length === 1 ? (
            `${photo.comments.length} comment`
          ) : photo.comments.length !== 0 ? (
            <span style={{ marginBottom: 10 }} onClick={showAllComments}>
              {`View all ${photo.comments.length} comments`}
            </span>
          ) : (
            <span>No commments yet...</span>
          )}
        </CommentCount>
      )}
      {activelyShownComments?.map((comment, idx) => (
        <SingleComment key={idx} author={comment.user}>
          {comment.content.split(" ").map((word, idx) => {
            const isHashtag = word.startsWith("#");
            return isHashtag ? (
              <CommentHashtagLink to="/hashtag" key={idx}>
                <CommentWord isHashtag={isHashtag}>{word}</CommentWord>
              </CommentHashtagLink>
            ) : (
              <CommentWord key={idx} isHashtag={isHashtag}>
                {" "}
                {word}{" "}
              </CommentWord>
            );
          })}
        </SingleComment>
      ))}
      <form onSubmit={handleSubmit(createComment)} style={{ marginTop: 10 }}>
        <CommentInput>
          <FontAwesomeIcon
            icon={faSmile}
            size="2x"
            onClick={() => setShowPicker(true)}
          />
          {showPicker && (
            <Picker
              pickerStyle={{ position: "absolute", top: "30px" }}
              onEmojiClick={onEmojiClick}
            />
          )}
          <input
            type="text"
            placeholder="Add a comment..."
            {...register("comment", {
              required: true,
              minLength: 3,
              maxLength: 200,
            })}
          />

          <AddCommentButton
            onClick={createComment}
            isValid={!Object.keys(formState.errors).length && formState.isDirty}
          >
            Post
          </AddCommentButton>
        </CommentInput>
      </form>
    </Comments>
  );
};

const AddCommentButton = styled.h3`
  font-size: 1.4rem;
  margin-left: 30px;
  font-weight: 400;
  color: ${({ isValid }) => (isValid ? "blue" : "lightgrey")};
  &:hover {
    cursor: pointer;
  }
`;

const CommentInput = styled.div`
  position: relative;
  border-top: 1px solid lightgrey;
  padding: 1rem 0;
  display: grid;
  align-items: center;
  grid-template-columns: 7% 83% 10%;
  margin-bottom: -13px;
`;

export default CommentBlock;
