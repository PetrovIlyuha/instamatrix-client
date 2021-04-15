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
      id
      user {
        username
      }
      file
      caption
      isMyPhoto
      isLikedByMe
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
      comments {
        content
        createdByMe
        user {
          username
          avatar
        }
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
      {data?.observePhotoFeed?.map(photo => (
        <Photo
          page={page}
          photo={photo}
          key={photo.id}
          isMediumScreen={isMediumScreen}
          isLikedByMe={photo.isLikedByMe}
        />
      ))}
    </PhotoFeedContainer>
  );
};

export default Home;
