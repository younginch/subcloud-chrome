import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';
import { MESSAGETAG } from '../../../utils/type';
import BottomButton from './components/BottomButton';
import QuickSubtitleRequest from './components/QuickSubtitleRequest';
import SubtitleComponent from './components/SubtitleComponent';
import CSSResetCustom from './cssResetCustom';
import componentLoader, { AttachType } from './helpers/componentLoader';

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
    Steps,
  },
});

const load = () => {
  // Load Comment-title panel
  const loadCommentModal = setInterval(() => {
    if (
      componentLoader({
        parentQuery: 'ytd-comments#comments div#header div#title',
        targetId: 'subcloud-comment-title',
        children: (
          <chakra-scope>
            <ChakraProvider theme={theme} resetCSS={false}>
              <CSSResetCustom />
              <QuickSubtitleRequest />
            </ChakraProvider>
          </chakra-scope>
        ),
      })
    )
      clearInterval(loadCommentModal);
  }, 100);

  // load Video Bottom Button
  const loadVideoBottomButton = setInterval(() => {
    if (
      componentLoader({
        parentQuery:
          'div#container div.ytp-chrome-controls div.ytp-left-controls .ytp-volume-area',
        targetId: 'subcloud-bottom-button',
        children: (
          <chakra-scope>
            <ChakraProvider theme={theme} resetCSS={false}>
              <CSSResetCustom />
              <BottomButton />
            </ChakraProvider>
          </chakra-scope>
        ),
        attachType: AttachType.PREPEND,
      })
    )
      clearInterval(loadVideoBottomButton);
  }, 100);

  // load subtitle component
  const loadSubtitleComponent = setInterval(() => {
    if (
      componentLoader({
        parentQuery: '#movie_player',
        targetId: 'subcloud-sub-component',
        children: <SubtitleComponent />,
      })
    )
      clearInterval(loadSubtitleComponent);
  }, 100);
};

window.onload = load;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.tag) {
    case MESSAGETAG.INIT:
      load();
      sendResponse({ data: 'load-done' });
      return true;
    default:
      sendResponse({ data: 'load-done' });
      return true;
  }
});
