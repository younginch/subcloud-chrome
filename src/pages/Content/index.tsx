import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { createRoot } from 'react-dom/client';
import Controller from './components/Controller';
import YoutubeModal from './components/YoutubeModal';
import CSSResetCustom from './cssResetCustom';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'chakra-scope': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

window.onload = () => {
  const loadCommentModal = setInterval(() => {
    const commentTitle = document.querySelector(
      'ytd-comments#comments div#header div#title'
    );
    if (commentTitle) {
      const theme = extendTheme({
        components: {
          Popover: {
            variants: {
              responsive: {
                popper: {
                  maxWidth: 'unset',
                  width: 'unset',
                },
              },
            },
          },
          initialColorMode: 'dark',
          useSystemColorMode: false,
        },
      });

      const commentTitleSubCloud = document.createElement('div');
      commentTitleSubCloud.id = 'subcloud-comment-title';
      commentTitle?.append(commentTitleSubCloud);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      createRoot(document.querySelector('#subcloud-comment-title')!).render(
        <chakra-scope>
          <ChakraProvider theme={theme} resetCSS={false}>
            <CSSResetCustom />
            <Controller />
          </ChakraProvider>
        </chakra-scope>
      );
      clearInterval(loadCommentModal);
    }
  }, 100);
};
