import { useReactiveVar } from '@apollo/client';
import React from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { darkMode, loggedIn } from './apollo';
import { GlobalStyles } from './GlobalStyles';
import Home from './screens/Home';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import { darkTheme, lightTheme } from './themes.ts';

function App() {
  const isLogged = useReactiveVar(loggedIn);
  const isDarkMode = useReactiveVar(darkMode);
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Router>
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
    </ThemeProvider>
  );
}

export default App;
