import React from 'react';
import styled, { DefaultTheme, StyledComponent } from 'styled-components';
import { darkMode } from '../apollo';
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-regular-svg-icons';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { useReactiveVar } from '@apollo/client';

const ToggleContainer = styled.button`
  position: absolute;
  margin-bottom: -2rem;
  right: 2vw;
  top: 2vh;
  background: ${({ theme }) => theme.gradient};
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.5rem;
  overflow: hidden;
  width: 2.3rem;
  height: 2.3rem;
  box-shadow: ${({ theme }) => theme.boxShadowColor};
`;

const Icons = styled.div`
  height: 2.3rem;
  width: 2rem;
`;

const SunIcon = styled(FontAwesomeIcon)`
  transition: all 0.3s ease;
  margin: 2px 0 0 5px;
  transform: ${props =>
    props.darkTheme ? 'translateY(4px)' : 'translateY(100px)'};
`;

const MoonIcon = styled(FontAwesomeIcon)`
  transition: all 0.3s ease;
  margin: 1px 0 0 5px;
  transform: ${props =>
    props.darkTheme ? 'translateY(100px)' : 'translateY(-20px)'};
`;

const ThemeToggler = () => {
  const theme = useReactiveVar(darkMode);
  return (
    <ToggleContainer onClick={() => (theme ? darkMode(false) : darkMode(true))}>
      <Icons>
        <SunIcon icon={faSun} size='3x' color='yellow' darkTheme={theme} />
        <MoonIcon icon={faMoon} size='3x' color='yellow' darkTheme={theme} />
      </Icons>
    </ToggleContainer>
  );
};

export default ThemeToggler;
