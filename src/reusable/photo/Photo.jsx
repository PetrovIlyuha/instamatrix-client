import React, { useCallback, useEffect, useState } from 'react';
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from '@fortawesome/free-regular-svg-icons';
import { faHeart as WasLikedHeartIcon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserAvatar } from '../styles/Shared';
import {
  PhotoActions,
  PhotoActionsGroupLeft,
  PhotoBookmark,
  PhotoContainer,
  PhotoContent,
  PhotoData,
  PhotoHeader,
  PhotoLikes,
  LikedBy,
  LikeIcon,
  Comments,
  Comment,
  CommentUsername,
  CommentCaption,
  CommentWord,
  CommentCount,
} from './PhotoStyles';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { PHOTO_FEED_QUERY } from '../../screens/Home';
import cogoToast from 'cogo-toast';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const Photo = ({ photo, comments, isMediumScreen, isLikedByMe, page }) => {
  console.log('photo', photo, 'comments', comments);
  const [animateLikeButton, setAnimateLikeButton] = useState(false);
  const [hashtagsPositions, setHashtagsPositions] = useState(null);
  const [observerRef, inView] = useInView({
    threshold: 0.2,
  });
  const [toggleLikeMutaion] = useMutation(TOGGLE_LIKE_MUTATION, {
    refetchQueries: [{ query: PHOTO_FEED_QUERY, variables: { page } }],
  });

  useEffect(() => {
    if (animateLikeButton) {
      toggleLikeMutaion({ variables: { id: photo.id } });
    }
    setTimeout(() => {
      setAnimateLikeButton(false);
    }, 100);
  }, [animateLikeButton]);

  const toggleLike = () => {
    if (photo.isMyPhoto) {
      cogoToast.error('I should not like your own photo!');
      return;
    } else {
      setAnimateLikeButton(true);
    }
  };
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
    <PhotoContainer
      ref={observerRef}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ duration: 0.2, delay: 0.05 }}>
      <PhotoHeader>
        <UserAvatar src={photo.user.avatar} />
        <span>{photo.user.username}</span>
      </PhotoHeader>
      <PhotoContent>
        <img src={photo.file} alt='' />
      </PhotoContent>
      <PhotoData>
        <PhotoActions>
          <PhotoActionsGroupLeft isMediumScreen={isMediumScreen}>
            {isLikedByMe ? (
              <LikeIcon animate={animateLikeButton}>
                <FontAwesomeIcon
                  icon={WasLikedHeartIcon}
                  color='red'
                  onClick={toggleLike}
                />
              </LikeIcon>
            ) : (
              <LikeIcon animate={animateLikeButton}>
                <FontAwesomeIcon icon={faHeart} onClick={toggleLike} />
              </LikeIcon>
            )}
            <FontAwesomeIcon icon={faComment} />
            <FontAwesomeIcon icon={faPaperPlane} />
          </PhotoActionsGroupLeft>
          <PhotoBookmark isMediumScreen={isMediumScreen}>
            <FontAwesomeIcon
              size={isMediumScreen ? '1x' : '2x'}
              icon={faBookmark}
            />
          </PhotoBookmark>
        </PhotoActions>
        <PhotoLikes>
          {photo.allLikes.length ? (
            <LikedBy>
              <motion.span
                initial={{ opacity: 0.6, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: 0.1 }}>
                Liked by
              </motion.span>
              <UserAvatar
                initial={{ opacity: 0.6, scale: 0.8, x: 30 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                src={photo.allLikes[0].avatar}
              />
            </LikedBy>
          ) : (
            <LikedBy>
              <motion.span
                initial={{ opacity: 0.6, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: 0.2 }}
                style={{ color: 'grey' }}>
                Be the First to like...
              </motion.span>
            </LikedBy>
          )}
          {photo.likesCount > 1 ? (
            <motion.h5
              style={{ fontWeight: 600 }}
              initial={{ opacity: 0.6, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}>
              and {photo.likesCount - 1} more...
            </motion.h5>
          ) : null}
        </PhotoLikes>
        <Comments>
          <Comment>
            <CommentUsername>{photo.user.username}</CommentUsername>
            <CommentCaption>
              {photo.caption.split(' ').map((word, wordIndex) => {
                const isHashtag = hashtagsPositions?.positions?.includes(
                  wordIndex,
                );
                return (
                  <CommentWord key={wordIndex} isHashtag={isHashtag}>
                    {' '}
                    {word}{' '}
                  </CommentWord>
                );
              })}
            </CommentCaption>
          </Comment>
          <CommentCount>
            {comments.length === 1
              ? `${comments.length} comment`
              : `${comments.length} comments`}
          </CommentCount>
        </Comments>
      </PhotoData>
    </PhotoContainer>
  );
};

export default Photo;