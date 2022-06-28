import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { createRoot } from 'react-dom/client';
import BottomButton from './components/BottomButton';
import ModalPopover from './components/ModalPopover';
import SubtitleComponent from './components/SubtitleComponent';
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
  },
});

window.onload = () => {
  // Load Comment-title panel
  const loadCommentModal = setInterval(() => {
    const commentTitle = document.querySelector(
      'ytd-comments#comments div#header div#title'
    );
    if (commentTitle) {
      const commentTitleSubCloud = document.createElement('div');
      commentTitleSubCloud.id = 'subcloud-comment-title';
      commentTitle.append(commentTitleSubCloud);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      createRoot(commentTitleSubCloud!).render(
        <chakra-scope>
          <ChakraProvider theme={theme} resetCSS={false}>
            <CSSResetCustom />
            <ModalPopover />
          </ChakraProvider>
        </chakra-scope>
      );
      clearInterval(loadCommentModal);
    }
  }, 1000);

  // load Video Bottom Button
  const loadVideoBottomButton = setInterval(() => {
    const bottomArea = document.querySelector(
      'div#container div.ytp-chrome-controls div.ytp-left-controls .ytp-volume-area'
    );
    if (bottomArea) {
      const bottomAreaButton = document.createElement('div');
      bottomAreaButton.id = 'subcloud-bottom-button';
      bottomArea.prepend(bottomAreaButton);

      createRoot(bottomAreaButton!).render(
        <chakra-scope>
          <ChakraProvider theme={theme} resetCSS={false}>
            <CSSResetCustom />
            <BottomButton />
          </ChakraProvider>
        </chakra-scope>
      );
      clearInterval(loadVideoBottomButton);
    }
  }, 100);

  // load subtitle component
  const loadSubtitleComponent = setInterval(() => {
    const subtitleArea = document.querySelector('#movie_player');
    if (subtitleArea) {
      const subtitleComponent = document.createElement('div');
      subtitleComponent.id = 'subcloud-sub-component';
      subtitleArea.append(subtitleComponent);

      createRoot(subtitleComponent!).render(<SubtitleComponent />);
      clearInterval(loadSubtitleComponent);
    }
  }, 100);
};
