import { Comment, CommentCaption, CommentUsername } from '../photo/PhotoStyles';

const SingleComment = ({ author, children }) => {
  console.log(author);
  return (
    <Comment>
      <CommentUsername>{author.username}</CommentUsername>
      <CommentCaption>{children}</CommentCaption>
    </Comment>
  );
};

export default SingleComment;
