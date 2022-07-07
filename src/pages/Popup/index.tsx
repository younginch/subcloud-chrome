import { createRoot } from 'react-dom/client';

import Popup from './Popup';
import './index.css';
// eslint-disable-next-line import/order
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  initialColorMode: 'light',
  colors: {
    bgColor: {
      200: '#26303E',
      300: '#232C39',
      500: '#1A202C',
      800: '#1C1E21',
    },
  },
});

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(window.document.querySelector('#app-container')!).render(
  <ChakraProvider theme={theme}>
    <Popup />
  </ChakraProvider>
);

if (module.hot) module.hot.accept();
