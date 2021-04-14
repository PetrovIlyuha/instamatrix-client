import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { PhotoFeedContainer, UserAvatar } from '../reusable/styles/Shared';
import ThemeToggler from '../reusable/ThemeToggler';
import Title from '../reusable/Title';
import MediaQueries from '../hooks/useQuery';
import Photo from '../reusable/photo/Photo';

export const PHOTO_FEED_QUERY = gql`
  query observePhotoFeed($page: Int!) {
    observePhotoFeed(page: $page) {
      comments {
        photo {
          id
        }
        user {
          username
        }
      }
      photo {
        id
        file
        isMyPhoto
        isLikedByMe
        caption
        allLikes {
          username
          avatar
        }
        user {
          username
          avatar
        }
        hashtags {
          hashtag
        }
        likesCount
      }
      comments {
        content
        createdByMe
      }
    }
  }
`;

const Home = () => {
  const [page, setPage] = useState(1);
  const { data } = useQuery(PHOTO_FEED_QUERY, { variables: { page } });
  console.log(data);
  const { isMediumScreen } = MediaQueries();
  return (
    <PhotoFeedContainer size={isMediumScreen}>
      <Title title='Home' />
      <ThemeToggler />
      {data?.observePhotoFeed?.map(photoWithComments => (
        <Photo
          page={page}
          photo={photoWithComments.photo}
          comments={photoWithComments.comments}
          key={photoWithComments.photo.id}
          isMediumScreen={isMediumScreen}
          isLikedByMe={photoWithComments.photo.isLikedByMe}
        />
      ))}
    </PhotoFeedContainer>
  );
};

export default Home;
