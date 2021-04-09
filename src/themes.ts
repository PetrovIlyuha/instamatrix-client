import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  background: '#F3F3F3',
  color: '#0D1117',
  toggleBorder: '#FFF',
  gradient: 'linear-gradient(#091236, #1E215D)',
  darkTheme: false,
  logoColor: 'darkblue',
  boxShadowColor: 'rgba(0,0,0,0.06)',
  inputBgColor: '#F3F3F3',
};
export const darkTheme: DefaultTheme = {
  background: '#0D1117',
  color: '#F3F3F3',
  toggleBorder: '#6B8096',
  gradient: 'linear-gradient(#39598A, #79D7ED)',
  darkTheme: true,
  logoColor: 'lightgreen',
  boxShadowColor: 'rgba(181, 238, 159, 0.32)',
  inputBgColor: '#714674',
};
