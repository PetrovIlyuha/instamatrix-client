import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { AUTH_TOKEN, DARK_THEME } from './constants';

export const loggedIn = makeVar(!!localStorage.getItem(AUTH_TOKEN));
export const darkMode = makeVar(!!localStorage.getItem(DARK_THEME));

export const enableDarkTheme = () => {
  localStorage.setItem(DARK_THEME, 'on');
  darkMode(true);
};

export const disableDarkTheme = () => {
  localStorage.removeItem(DARK_THEME);
  darkMode(false);
};

export const logUserIn = token => {
  localStorage.setItem(AUTH_TOKEN, token);
  loggedIn(true);
};

export const logUserOut = () => {
  localStorage.removeItem(AUTH_TOKEN);
  loggedIn(false);
};

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      auth: token,
    },
  };
});

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export default client;
