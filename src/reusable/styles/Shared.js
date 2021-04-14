import { motion } from 'framer-motion';
import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  height: 100vh;
  max-width: 920px;
  margin: 0 auto;
  width: 100%;
  align-items: center;
`;

export const PhotoFeedContainer = styled.div`
  display: flex;
  max-width: ${({ size }) => (size ? '600px' : '920px')};
  margin: 0 auto;
  margin-top: 8rem;
  flex-direction: column;
`;
export const spin = keyframes`
  0% {
    transform: rotate(0deg)
  }
  360% {
    transform: rotate(360deg)
  }
`;

export const Spinner = styled.div`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  text-align: center;
  border: 2px solid ${({ color }) => color};
  border-radius: 50%;
  animation: 2s ${spin} infinite linear forwards;
`;

export const UserAvatar = styled(motion.img)`
  width: ${({ small }) => (small ? '1.4rem' : '2.1rem')};
  height: ${({ small }) => (small ? '1.4rem' : '2.1rem')};
  border-radius: 50%;
  border: 1px solid lightgrey;
  padding: 0.1rem;
  object-fit: cover;
`;
