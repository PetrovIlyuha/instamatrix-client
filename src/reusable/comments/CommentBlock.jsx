import { useEffect, useState } from 'react';
import { CommentCount, Comments, CommentWord } from '../photo/PhotoStyles';
import SingleComment from './SingleComment';

const CommentBlock = ({ photo }) => {
  const [hashtagsPositions, setHashtagsPositions] = useState(null);
  useEffect(() => {
    if (photo) {
      const hashTags = photo.hashtags.map(hash => hash.hashtag);
      let hashTagsPositionsCalc = [];
      hashTags.map(hashtag => {
        let hashtagStartPos = photo.caption
          .split(' ')
          .findIndex(word => word === hashtag);
        hashTagsPositionsCalc = [...hashTagsPositionsCalc, hashtagStartPos];
      });
      setHashtagsPositions({ positions: hashTagsPositionsCalc });
    }
  }, [photo]);
  return (
    <Comments>
      <SingleComment author={photo.user}>
        {photo.caption.split(' ').map((word, wordIndex) => {
          const isHashtag = hashtagsPositions?.positions?.includes(wordIndex);
          return (
            <CommentWord key={wordIndex} isHashtag={isHashtag}>
              {' '}
              {word}{' '}
            </CommentWord>
          );
        })}
      </SingleComment>
      <CommentCount>
        {photo.comments.length === 1
          ? `${photo.comments.length} comment`
          : `${photo.comments.length} comments`}
      </CommentCount>
      {photo.comments?.map((comment, idx) => (
        <SingleComment key={idx} author={comment.user}>
          {comment.content}
        </SingleComment>
      ))}
    </Comments>
  );
};

export default CommentBlock;
