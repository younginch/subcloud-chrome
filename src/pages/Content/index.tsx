import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { MESSAGETAG } from '../../../utils/type';
import BottomButton from './components/bottomButton';
import QuickSubtitleRequest from './components/quickSubtitleRequest';
import SubtitleComponent from './components/subtitleComponent';
import ToastComponent from './components/toastComponent';
import CSSResetCustom from './components/cssResetCustom';
import componentLoader, { AttachType } from './helpers/componentLoader';
import { ToastType } from './utils/toast';
import ReviewComponent from './components/reviewComponent';
import { closeMainModal } from './helpers/modalControl';

declare let bootstrap: any;

const theme = extendTheme({
  initialColorMode: 'dark',
  useSystemColorMode: false,
  colors: {
    bgColor: {
      200: '#26303E',
      300: '#232C39',
      500: '#1A202C',
      800: '#1C1E21',
    },
  },
});

/**
 * msg를 담고있는 toast생성
 * @param {ToastType} type 토스트 타입
 * @param {String} msg 메세지 내용
 * @param {String} delay 토스트가 띄워져 있는 시간
 */
function toast(type: ToastType, msg: string, delay = 5000) {
  const toastText = document.getElementById('toast-message');
  const toastHeader = document.getElementById('0-toast-header');
  const toastBody = document.getElementById('liveToast');

  if (!toastText || !toastHeader || !toastBody) return;
  toastText.innerHTML = msg;

  switch (type) {
    case ToastType.SUCCESS:
      toastHeader.style.backgroundColor = '#38A169';
      toastBody.style.backgroundColor = '#3DAD72';
      break;
    case ToastType.WARNING:
      toastHeader.style.backgroundColor = '#de6b1f';
      toastBody.style.backgroundColor = '#f87925';
      break;
    case ToastType.INFO:
      toastHeader.style.backgroundColor = '#8FAADC';
      toastBody.style.backgroundColor = '#90CDF4';
      break;
    default:
      toastHeader.style.backgroundColor = '#E53E3E';
      toastBody.style.backgroundColor = '#EA6868';
  }
  const options = {
    delay,
  };
  const toastElement = new bootstrap.Toast(toastBody, options);
  toastElement.show();
}

const loadReview = (subId: string) => {
  const loadReviewComponent = setInterval(() => {
    if (
      componentLoader({
        parentQuery: '#movie_player',
        targetId: 'subcloud-review-component',
        children: <ReviewComponent duration={6000} subId={subId} />,
      })
    )
      clearInterval(loadReviewComponent);
  }, 100);
};

const load = () => {
  // Load Comment-title panel
  const loadToast = setInterval(() => {
    if (
      componentLoader({
        parentQuery: 'body',
        targetId: 'subcloud-toast',
        className: 'bootstrap',
        children: <ToastComponent />,
      })
    )
      clearInterval(loadToast);
  }, 100);

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
  }, 2000);

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
      closeMainModal();
      load();
      sendResponse({ data: 'load-done' });
      return true;
    case MESSAGETAG.TOAST:
      toast(message.toastType, message.msg);
      sendResponse({ data: 'toast' });
      return true;
    case MESSAGETAG.REVIEW:
      loadReview(message.subId);
      sendResponse({ data: 'review' });
      return true;
    default:
      sendResponse({ data: 'load-done' });
      return true;
  }
});
