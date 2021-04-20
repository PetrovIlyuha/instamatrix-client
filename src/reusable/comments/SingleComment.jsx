import { Comment, CommentCaption, CommentUsername } from "../photo/PhotoStyles";

const SingleComment = ({ author, children }) => {
  return (
    <Comment>
      <CommentUsername>{author.username}</CommentUsername>
      <CommentCaption>{children}</CommentCaption>
    </Comment>
  );
};

export default SingleComment;
