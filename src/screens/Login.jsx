import React, { useState } from 'react';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ThemeToggler from '../reusable/ThemeToggler.jsx';
import {
  FormInput,
  LoginButton,
  LoginFormBox,
  Logo,
  SignUpProposedBox,
  Wrapper,
} from './LoginStyles';
import { Container, Spinner } from '../reusable/styles/Shared.js';
import Title from '../reusable/Title';
import ErrorFormMessage from '../reusable/ErrorFormMessage';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import cogoToast from 'cogo-toast';
import { logUserIn } from '../apollo.js';

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

const Login = () => {
  const location = useLocation();
  const {
    register,
    getValues,
    handleSubmit,
    formState,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      username: location?.state?.username || '',
      password: location?.state?.password || '',
    },
    mode: 'onBlur',
    shouldFocusError: true,
    reValidateMode: 'onChange',
  });

  const loginCompleted = data => {
    const {
      login: { ok, error, token },
    } = data;
    if (ok && !error && token) {
      cogoToast.success('Welcome Aboard! 🦜');
      logUserIn(token);
    } else if (!ok && error) {
      cogoToast.error(error);
      setError('login', { message: error });
    }
  };

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: loginCompleted,
  });

  const submitLoginForm = e => {
    const { username, password } = getValues();
    login({ variables: { username, password } });
  };
  const clearLoginError = () => {
    clearErrors('login');
  };
  return (
    <Container>
      <ThemeToggler />
      <Title title='Log In' />
      <Wrapper>
        <LoginFormBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}>
          <Logo
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}>
            <FontAwesomeIcon icon={faCamera} size='2x' />
            <h1>InstaMatrix</h1>
          </Logo>
          <form onSubmit={handleSubmit(submitLoginForm)}>
            <FormInput
              {...register('username', { required: true, minLength: 3 })}
              type='text'
              isErrored={formState.errors.username}
              placeholder='Username'
              autoComplete='username'
              onChange={clearLoginError}
            />
            {formState.errors.username && (
              <ErrorFormMessage message='Username is too short. 3 Characters Min.' />
            )}
            <FormInput
              isErrored={formState.errors.password}
              {...register('password', { required: true, minLength: 6 })}
              type='password'
              placeholder='Password'
              autoComplete='current-password'
              onChange={clearLoginError}
            />
            {formState.errors.password && (
              <ErrorFormMessage message='Password too short. Min 6 characters' />
            )}
            {formState.errors.login && (
              <div style={{ textAlign: 'center', marginTop: 5 }}>
                <ErrorFormMessage message={formState.errors.login.message} />
              </div>
            )}
            <LoginButton
              type='submit'
              disabled={Object.keys(formState.errors).length}>
              {loading ? <Spinner color='lightgrey' size='1rem' /> : 'Log In'}
            </LoginButton>
          </form>
        </LoginFormBox>
        <SignUpProposedBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}>
          <span>Dont have an account?</span>
          <Link to='/signup'>Sign Up</Link>
        </SignUpProposedBox>
      </Wrapper>
    </Container>
  );
};

export default Login;
