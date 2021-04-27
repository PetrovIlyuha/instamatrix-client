import { motion } from "framer-motion";
import styled from "styled-components";

export const AppHeaderBar = styled(motion.header)`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  border-bottom: 1px solid ${({ theme }) => theme.toggleBorder};
  background-color: ${({ theme }) => theme.background};
  padding: 20px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeaderWrapperFlexLarge = styled.div`
  max-width: ${({ size }) => (size ? "600px" : "920px")};
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Column = styled.div`
  display: flex;
  align-items: center;
  svg {
    color: ${({ theme }) => theme.logoColor};
  }
`;

export const Icon = styled(motion.span)`
  margin-left: 15px;
`;

export const LoginAppBarBtn = styled.button`
  background-color: #0095f6;
  display: flex;
  justify-content: center;
  color: white;
  border-radius: 3px;
  text-align: center;
  padding: 9px 8px;
  font-family: sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2 ease;
  &:hover {
    background-color: #177dbf;
  }
  &:disabled {
    background-color: lightgrey;
  }
`;

export const AppNavBarLogo = styled.div`
  svg {
    transform: rotate(15deg);
    border: 1px solid ${({ theme }) => theme.toggleBorder};
    padding: 5px;
    border-radius: 50%;
  }
`;
