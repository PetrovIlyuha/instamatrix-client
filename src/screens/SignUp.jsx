import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import { Container, Spinner } from '../reusable/styles/Shared';
import ThemeToggler from '../reusable/ThemeToggler';
import {
  FormInput,
  LoginButton,
  LoginFormBox,
  Logo,
  PolicyDisclaimer,
  SignUpProposedBox,
  Wrapper,
} from './LoginStyles';
import Title from '../reusable/Title';
import ErrorFormMessage from '../reusable/ErrorFormMessage';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import cogoToast from 'cogo-toast';

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
      user {
        id
        firstName
        lastName
        username
      }
    }
  }
`;

const SignUp = () => {
  const history = useHistory();
  const { getValues, formState, register, handleSubmit } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    shouldFocusError: true,
  });
  const signUpCompleted = data => {
    const { username, password } = getValues();
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      cogoToast.error('Something went wrong! Try again');
    } else if (!ok && error) {
      cogoToast.error(error);
    } else {
      cogoToast.success('You have created an account, Please Log In!', {
        heading: 'Welcome!',
      });
      setTimeout(() => {
        history.push({ pathname: '/', state: { username, password } });
      }, 1400);
    }
  };

  const [signup, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted: signUpCompleted,
  });

  const submitSignUpForm = params => {
    const { firstName, lastName, username, email, password } = getValues();
    signup({ variables: { firstName, lastName, username, email, password } });
  };

  return (
    <Container>
      <ThemeToggler />
      <Title title='Sign Up' />
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
            <h2>Sign up to see photos and videos from your friends.</h2>
          </Logo>
          <form onSubmit={handleSubmit(submitSignUpForm)}>
            <FormInput
              {...register('firstName', { required: true, minLength: 2 })}
              type='text'
              isErrored={formState.errors.firstName}
              placeholder='First name'
              autoComplete='first name'
            />
            {formState.errors.firstName && (
              <ErrorFormMessage message='First name is too short. 2 Characters min' />
            )}
            <FormInput
              {...register('lastName')}
              type='text'
              isErrored={formState.errors.lastName}
              placeholder='Last name'
              autoComplete='last name'
            />
            <FormInput
              {...register('username', { required: true, minLength: 3 })}
              type='text'
              isErrored={formState.errors.username}
              placeholder='Username'
              autoComplete='username'
            />
            {formState.errors.username && (
              <ErrorFormMessage message='User should be longer than 3 charaters' />
            )}
            <FormInput
              {...register('email', {
                required: true,
                pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              })}
              isErrored={formState.errors.email}
              type='email'
              placeholder='email'
              autoComplete='email'
            />
            {formState.errors.email && (
              <ErrorFormMessage message='Email is not valid' />
            )}
            <FormInput
              {...register('password', { required: true, minLength: 6 })}
              type='password'
              isErrored={formState.errors.password}
              placeholder='Password'
              autoComplete='current-password'
            />
            {formState.errors.password && (
              <ErrorFormMessage message='Password should be at least 6 characters' />
            )}
            <LoginButton
              type='submit'
              disabled={Object.keys(formState.errors).length}>
              {loading ? <Spinner color='lightgrey' size='1rem' /> : 'Sign Up'}
            </LoginButton>
            <PolicyDisclaimer>
              By signing up you are explicitly agreeing with service terms and
              conditions
            </PolicyDisclaimer>
          </form>
        </LoginFormBox>
        <SignUpProposedBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}>
          <span>Have an account?</span>
          <Link to='/login'>Log In</Link>
        </SignUpProposedBox>
      </Wrapper>
    </Container>
  );
};

export default SignUp;
