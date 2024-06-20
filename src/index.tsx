import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { RecoilRoot } from 'recoil';
import GlobalStyles from './shared/styles/GlobalStyles';
import theme from './shared/styles/theme';
import router from './router';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <RouterProvider router={router} />
      </ThemeProvider>
    </RecoilRoot>
);
