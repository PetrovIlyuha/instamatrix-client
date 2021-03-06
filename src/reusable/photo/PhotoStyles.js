import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const PhotoContainer = styled(motion.div)`
  width: 100%;
  background-color: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.toggleBorder};
  border-radius: 3px;
  margin-bottom: 1.3rem;
  box-shadow: 2px 5px 12px -2px ${({ theme }) => theme.boxShadowColor};
`;

export const PhotoHeader = styled.div`
  padding: 12px 10px;
  display: flex;
  align-items: center;
  width: 4rem;
  justify-content: space-between;
  span {
    margin-left: 0.9rem;
    font-weight: 600;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

export const PhotoContent = styled.div`
  img {
    max-width: 100%;
  }
`;

export const PhotoData = styled.div``;

export const PhotoActions = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
`;

export const PhotoActionsGroupLeft = styled.div`
  min-width: 15%;
  display: flex;
  justify-content: space-between;
  svg {
    font-size: ${({ isMediumScreen }) => (isMediumScreen ? "18px" : "22px")};
  }
`;

export const LikeIcon = styled.div`
  svg {
    font-size: ${({ isMediumScreen }) => (isMediumScreen ? "18px" : "22px")};
    transform: ${({ animate }) => (animate ? "scale(1.3)" : "scale(1)")};
    transition: all 0.1s ease-in-out;
  }
`;
export const PhotoBookmark = styled.div`
  svg {
    font-size: ${({ isMediumScreen }) => (isMediumScreen ? "18px" : "22px")};
  }
`;

export const PhotoLikes = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  width: 25%;
  justify-content: space-between;
`;

export const LikedBy = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-self: start;
  span {
    margin-right: 0.3rem;
    font-weight: 600;
  }
`;

export const Comments = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
`;

export const Comment = styled(motion.div)`
  display: flex;
  align-items: center;
  margin: 0.3rem 0;
  a {
    text-decoration: none;
    color: black;
  }
`;

export const CommentUsername = styled.span`
  color: ${({ theme }) => theme.linkColor};
  font-weight: 500;
`;
export const CommentCaption = styled.span`
  margin-left: 1rem;
`;

export const CommentHashtagLink = styled(Link)`
  span {
    color: ${({ theme }) => theme.linkColor};
    text-decoration: none;
  }
`;

export const CommentWord = styled.span`
  font-weight: ${({ isHashtag }) => (isHashtag ? "600" : "400")};
  font-size: ${({ isHashtag }) => (isHashtag ? "16px" : "15px")};
  transition: all 0.2s ease;
  &:hover {
    color: ${({ theme, isHashtag }) =>
      isHashtag ? "#6930c3" : theme.linkColor};
  }
`;

export const CommentCount = styled.div`
  opacity: 0.5;
  font-size: 12px;
  margin: 1rem 0;
  cursor: pointer;
`;
