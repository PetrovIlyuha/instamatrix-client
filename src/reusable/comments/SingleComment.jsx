import { Link } from "react-router-dom";
import { Comment, CommentCaption, CommentUsername } from "../photo/PhotoStyles";

const SingleComment = ({ author, children }) => {
  return (
    <Comment>
      <Link to={`/users/${author.username}`}>
        <CommentUsername>{author.username}</CommentUsername>
      </Link>
      <CommentCaption>{children}</CommentCaption>
    </Comment>
  );
};

export default SingleComment;
