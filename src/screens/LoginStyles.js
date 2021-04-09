import { motion } from 'framer-motion';
import styled from 'styled-components';

export const LoginBox = styled(motion.div)`
  background-color: white;
  font-size: 1rem;
  border: 1px rgb(220, 220, 220) solid;
  box-shadow: 2px 3px 7px -1px ${({ theme }) => theme.boxShadowColor};
`;

export const LoginFormBox = styled(LoginBox)`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.background};
  align-items: center;
  padding: 20px 40px 25px 40px;
  border-radius: 5px;
  form {
    margin-top: 35px;
    width: 100%;
    display: flex;
    flex-direction: column;

    input {
      padding: 10px 8px;
      background-color: ${({ theme }) => theme.inputBgColor};
      border: 1px solid lightgrey;
      margin-top: 5px;
      border-radius: 3px;
      &::placeholder {
        font-size: 0.8rem;
      }
    }
  }
`;

export const LoginButton = styled.button`
  margin-top: 15px;
  background-color: #0095f6;
  color: white;
  border-radius: 3px;
  text-align: center;
  padding: 9px 0px;
  font-family: sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2 ease;
  &:hover {
    background-color: #177dbf;
  }
`;

export const SignUpProposedBox = styled(LoginBox)`
  padding: 20px 0;
  text-align: center;
  margin-top: 20px;
  border-radius: 3px;
  background: ${({ theme }) => theme.background};
  a {
    color: ${({ theme }) => theme.logoColor};
    padding-left: 10px;
    font-weight: 600;
    text-decoration: none;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: 350px;
`;

export const Logo = styled(motion.div)`
  font-family: 'Pacifico', cursive;
  display: flex;
  flex-direction: column;
  align-items: center;
  svg {
    transform: rotate(20deg);
    color: ${({ theme }) => theme.logoColor};
  }
  h1 {
    margin-top: 10px;
    font-size: 1.3rem;
    font-family: 'Pacifico', cursive;
  }
  h2 {
    margin-top: 1rem;
    text-align: center;
    color: grey;
    font-family: sans-serif;
    font-weight: 600;
  }
`;

export const PolicyDisclaimer = styled.h3`
  color: grey;
  text-align: left;
  margin-top: 1rem;
  font-weight: 400;
`;
