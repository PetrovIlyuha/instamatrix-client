import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@apollo/client";
import { QUERY_USER_PROFILE } from "./apollo/queries";
import ThemeToggler from "../reusable/ThemeToggler";
import Title from "../reusable/Title";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";

export const UserProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: start;
  height: 100vh;
  max-width: 920px;
  margin: 0 auto;
  margin-top: 100px;
  width: 100%;
  align-items: start;
`;

const ProfileBtn = styled.button`
  padding: 8px 12px;
  border-radius: 8px;
  background: lightgrey;
  border: 1px solid darkgrey;
`;

const ProfileDetails = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr 80%;
  width: 100%;
  height: 300px;
  padding: 2rem 6rem;
`;

const ProfileAvatar = styled.img`
  height: 8rem;
  width: 8rem;
  border-radius: 50%;
`;

const UserProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

const ProfileInfoRow = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 1.5rem;
  margin-left: 3rem;
`;

const Username = styled.h2`
  color: inherit;
`;

const ProfileButton = styled.button`
  padding: 0.35rem 1rem;
  border-radius: 4px;
  border: 1px solid grey;
  margin-left: 2rem;
`;

const ProfileStats = styled.div`
  display: flex;
  align-items: center;
  &:not(:first-child) {
    margin-left: 1rem;
  }
  font-weight: 500;
  span {
    font-weight: 400;
    margin-left: 0.2rem;
  }
`;

const UserFullName = styled.h3`
  font-weight: 500;
`;

const ProfilePosts = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  grid-template-rows: 300px;
  gap: 2rem;
  margin-top: 6rem;
`;

const ProfilePhoto = styled.div`
  background-image: ${({ photo }) => `url(${photo})`};
  background-size: cover;
  position: relative;
`;

const ProfilePhotoIcons = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transition: all 0.3s ease;
  height: 100%;
  width: 100%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.2);
  justify-content: space-between;
  display: ${({ showIcons }) => (showIcons ? "block" : "none")};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.div`
  display: flex;
  width: 10%;
  justify-content: space-around;
  margin-left: 1rem;
`;

const UserProfile = () => {
  const [showPhotoStats, setShowPhotoStats] = useState({ id: null });
  const { username } = useParams();

  const { data, loading } = useQuery(QUERY_USER_PROFILE, {
    variables: { username },
  });
  const unfollowUser = (params) => {};

  const followUser = (params) => {};

  // console.log(data);
  const getButton = (seeProfile) => {
    const { isMyProfile, isFollowing } = seeProfile;
    if (isMyProfile) {
      return <ProfileBtn>Edit Profile</ProfileBtn>;
    }
    if (isFollowing) {
      return <ProfileBtn onClick={unfollowUser}>Unfollow</ProfileBtn>;
    } else {
      return <ProfileBtn onClick={followUser}>Follow</ProfileBtn>;
    }
  };

  const buildProfileButton = (data) => {
    if (data?.isMyProfile) {
      return "Edit Profile";
    } else if (data?.isFollowing) {
      return "Unfollow";
    } else {
      return "Follow";
    }
  };
  return (
    <UserProfileContainer>
      <ThemeToggler />
      <Title
        title={
          loading ? "Loading..." : `${data.seeProfile?.username}'s profile`
        }
      />
      <ProfileDetails>
        <ProfileAvatar src={data?.seeProfile?.avatar} />
        <UserProfileInfo>
          <ProfileInfoRow>
            <Username>{data?.seeProfile?.username}</Username>
            <ProfileButton>
              {buildProfileButton(data?.seeProfile)}
            </ProfileButton>
          </ProfileInfoRow>
          <ProfileInfoRow>
            <ProfileStats>
              {data?.seeProfile.photos.length} <span> posts</span>
            </ProfileStats>
            <ProfileStats>
              {data?.seeProfile.totalFollowers} <span>followers</span>
            </ProfileStats>
            <ProfileStats>
              {data?.seeProfile.totalFollowing} <span>following</span>
            </ProfileStats>
          </ProfileInfoRow>
          <ProfileInfoRow>
            <UserFullName>
              {data?.seeProfile.firstName} {data?.seeProfile?.lastName}
            </UserFullName>
          </ProfileInfoRow>
        </UserProfileInfo>
      </ProfileDetails>
      <ProfilePosts>
        {data?.seeProfile?.photos.map((photo) => (
          <React.Fragment key={photo.id}>
            <ProfilePhoto
              photo={photo.file}
              showIcons={showPhotoStats?.id === photo.id}
              onMouseEnter={() =>
                setShowPhotoStats((prev) => ({
                  id: photo.id,
                }))
              }
              onMouseLeave={() => setShowPhotoStats(null)}
            >
              {showPhotoStats?.id === photo.id && (
                <ProfilePhotoIcons showIcons={showPhotoStats?.id === photo.id}>
                  <Icon>
                    <FontAwesomeIcon icon={faHeart} />
                    <span>{photo?.likesCount}</span>
                  </Icon>
                  <Icon>
                    <FontAwesomeIcon icon={faComment} />
                    <span>{photo?.comments.length}</span>
                  </Icon>
                </ProfilePhotoIcons>
              )}
            </ProfilePhoto>
          </React.Fragment>
        ))}
      </ProfilePosts>
    </UserProfileContainer>
  );
};

export default UserProfile;
