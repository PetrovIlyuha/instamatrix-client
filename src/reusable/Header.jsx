import React from "react";
import { Link } from "react-router-dom";
import { faCompass, faUser } from "@fortawesome/free-regular-svg-icons";
import { faCamera, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loggedIn } from "../apollo";
import useCurrentUser from "../hooks/useCurrentUser";
import { UserAvatar } from "./styles/Shared";
import {
  AppHeaderBar,
  AppNavBarLogo,
  Column,
  HeaderWrapperFlexLarge,
  Icon,
  LoginAppBarBtn,
} from "./HeaderStyles";

const Header = ({ size }) => {
  const isUserAuthenticated = loggedIn();
  const user = useCurrentUser();
  return (
    <AppHeaderBar>
      <HeaderWrapperFlexLarge size={size}>
        <Column>
          <AppNavBarLogo>
            <Link to="/">
              <FontAwesomeIcon icon={faCamera} size="2x" />
            </Link>
          </AppNavBarLogo>
        </Column>
        <Column>
          {isUserAuthenticated ? (
            <React.Fragment>
              <Icon
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Link to="/">
                  <FontAwesomeIcon icon={faHome} size={size ? "1x" : "2x"} />
                </Link>
              </Icon>
              <Icon
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FontAwesomeIcon icon={faCompass} size={size ? "1x" : "2x"} />
              </Icon>
              <Icon
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {user ? (
                  <Link to={`/users/${user?.user?.username}`}>
                    <UserAvatar
                      small={size}
                      src={user?.user?.avatar}
                      alt="opens user profile page"
                    />
                  </Link>
                ) : (
                  <FontAwesomeIcon icon={faUser} size={size ? "1x" : "2x"} />
                )}
              </Icon>
            </React.Fragment>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <LoginAppBarBtn>Login</LoginAppBarBtn>
            </Link>
          )}
        </Column>
      </HeaderWrapperFlexLarge>
    </AppHeaderBar>
  );
};

export default Header;
