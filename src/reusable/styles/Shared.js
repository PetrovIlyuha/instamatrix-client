import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  align-items: center;
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
