import { PropsWithChildren } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';

const theme: DefaultTheme = {
  colors: {
    main: '#D90429',
    secondary: '#2B2D42',
    complementary: '#8D99AE',
    black: '#191923',
    light: '#EDF2F4',
  },
  fontSizes: {
    xsmall: '0.7rem',
    small: '0.875rem',
    medium: '1rem',
    large: '1.25rem',
    xlarge: '1.5rem',
  },
  spacing: {
    xsmall: '0.25rem',
    small: '0.5rem',
    medium: '1rem',
    large: '1.5rem',
    xlarge: '2rem',
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
  },
};

export default function StyledProvider({ children }: PropsWithChildren) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
