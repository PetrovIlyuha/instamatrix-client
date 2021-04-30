import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { PhotoFeedContainer } from "../reusable/styles/Shared";
import ThemeToggler from "../reusable/ThemeToggler";
import Title from "../reusable/Title";
import MediaQueries from "../hooks/useQuery";
import Photo from "../reusable/photo/Photo";
import { PHOTO_FEED_QUERY } from "./apollo/queries";

const Home = () => {
  const [page, setPage] = useState(1);
  const { data } = useQuery(PHOTO_FEED_QUERY, {
    variables: { page },
    pollInterval: 8000,
  });
  const { isMediumScreen } = MediaQueries();
  return (
    <PhotoFeedContainer size={isMediumScreen}>
      <Title title="Home" />
      <ThemeToggler />
      {data?.observePhotoFeed?.map((photo) => (
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
