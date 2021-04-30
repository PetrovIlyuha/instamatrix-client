import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    background: string;
    color: string;
    toggleBorder: string;
    gradient: string;
    darkTheme: boolean;
    logoColor: string;
    boxShadowColor: string;
    inputBgColor: string;
    linkColor: string;
  }
}
