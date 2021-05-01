import gql from "graphql-tag";

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

export const QUERY_USER_PROFILE = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      id
      firstName
      lastName
      username
      email
      bio
      avatar
      isMyProfile
      isFollowing
      following {
        id
        username
        avatar
      }
      followers {
        id
        username
        avatar
      }
      totalFollowing
      totalFollowers
      photos {
        id
        file
        caption
        likesCount
        isLikedByMe
        isMyPhoto
        hashtags {
          id
          hashtag
        }
        comments {
          id
          content
          user {
            id
            username
            avatar
          }
        }
      }
    }
  }
`;
