import React from 'react';
import { Link } from 'react-router-dom';
import { faCompass, faUser } from '@fortawesome/free-regular-svg-icons';
import { faCamera, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { loggedIn } from '../apollo';
import useCurrentUser from '../hooks/useCurrentUser';
import { UserAvatar } from './styles/Shared';

const AppHeaderBar = styled(motion.header)`
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

const HeaderWrapperFlexLarge = styled.div`
  max-width: ${({ size }) => (size ? '600px' : '920px')};
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.div`
  display: flex;
  align-items: center;
  svg {
    color: ${({ theme }) => theme.logoColor};
  }
`;

const Icon = styled(motion.span)`
  margin-left: 15px;
`;

const LoginAppBarBtn = styled.button`
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

const AppNavBarLogo = styled.div`
  svg {
    transform: rotate(15deg);
    border: 1px solid ${({ theme }) => theme.toggleBorder};
    padding: 5px;
    border-radius: 50%;
  }
`;

const Header = ({ size }) => {
  const isUserAuthenticated = loggedIn();
  const user = useCurrentUser();
  return (
    <AppHeaderBar>
      <HeaderWrapperFlexLarge size={size}>
        <Column>
          <AppNavBarLogo>
            <FontAwesomeIcon icon={faCamera} size='2x' />
          </AppNavBarLogo>
        </Column>
        <Column>
          {isUserAuthenticated ? (
            <React.Fragment>
              <Icon
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}>
                <FontAwesomeIcon icon={faHome} size={size ? '1x' : '2x'} />
              </Icon>
              <Icon
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}>
                <FontAwesomeIcon icon={faCompass} size={size ? '1x' : '2x'} />
              </Icon>
              <Icon
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}>
                {user ? (
                  <UserAvatar
                    small={size}
                    src={user?.user?.avatar}
                    alt='opens user profile page'
                  />
                ) : (
                  <FontAwesomeIcon icon={faUser} size={size ? '1x' : '2x'} />
                )}
              </Icon>
            </React.Fragment>
          ) : (
            <Link to='/login' style={{ textDecoration: 'none' }}>
              <LoginAppBarBtn>Login</LoginAppBarBtn>
            </Link>
          )}
        </Column>
      </HeaderWrapperFlexLarge>
    </AppHeaderBar>
  );
};

export default Header;
