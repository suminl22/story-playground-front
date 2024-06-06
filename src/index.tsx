import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { RecoilRoot } from 'recoil';
import GlobalStyles from './shared/styles/GlobalStyles'; // Ensure the path is correct
import theme from './shared/styles/theme'; // Ensure the path is correct
import router from './router'; // Ensure the path is correct

const container = document.getElementById('root');
const root = createRoot(container!); // Ensure that the container is not null with the non-null assertion operator

root.render(
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <RouterProvider router={router} />
      </ThemeProvider>
    </RecoilRoot>
);
