import { ApolloProvider, useReactiveVar } from '@apollo/client';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import client, { darkMode, loggedIn } from './apollo';
import { GlobalStyles } from './GlobalStyles';
import MediaQueries from './hooks/useQuery';
import Header from './reusable/Header';
import Home from './screens/Home';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import { darkTheme, lightTheme } from './themes.ts';

function App() {
  const isLogged = useReactiveVar(loggedIn);
  const isDarkMode = useReactiveVar(darkMode);
  const { isMediumScreen } = MediaQueries();
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <ApolloProvider client={client}>
        <HelmetProvider>
          <GlobalStyles />
          <Router>
            <Header size={isMediumScreen} />
            <Switch>
              <Route path='/' exact>
                {isLogged ? <Home /> : <Login />}
              </Route>
              <Route path='/signup'>
                <SignUp />
              </Route>
              <Route>
                <Redirect to='/' />
              </Route>
            </Switch>
          </Router>
        </HelmetProvider>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
