import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';

export const loggedIn = makeVar(!!localStorage.getItem('insta-token'));
export const darkMode = makeVar(false);

export const logUserIn = token => {
  localStorage.setItem('insta-token', token);
  loggedIn(true);
};

export const logUserOut = () => {
  localStorage.removeItem('insta-token');
  loggedIn(false);
};

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export default client;
