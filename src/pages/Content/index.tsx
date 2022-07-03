import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';
import { MESSAGETAG } from '../../../utils/type';
import BottomButton from './components/BottomButton';
import QuickSubtitleRequest from './components/QuickSubtitleRequest';
import SubtitleComponent from './components/SubtitleComponent';
import ToastComponent from './components/toastComponent';
import CSSResetCustom from './cssResetCustom';
import componentLoader, { AttachType } from './helpers/componentLoader';
import Toast, { ToastType } from './utils/toast';

declare let bootstrap: any;

const theme = extendTheme({
  components: {
    Steps,
  },
});

/**
 * msg를 담고있는 toast생성
 * @param {ToastType} type 토스트 타입
 * @param {String} msg 메세지 내용
 */
function toast(type: ToastType, msg: string) {
  const toastText = document.getElementById('toast-message');
  const toastHeader = document.getElementById('0-toast-header');
  const toastBody = document.getElementById('liveToast');
  const toastElement = document.getElementById('liveToast');

  console.log(type, msg);

  if (!toastText || !toastHeader || !toastBody || !toastElement) return;

  console.log('still alive');

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
    default:
      toastHeader.style.backgroundColor = '#E53E3E';
      toastBody.style.backgroundColor = '#EA6868';
  }

  const toastController = new bootstrap.Toast(toastElement);
  toastController.show();
}

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
    case MESSAGETAG.TOAST:
      toast(ToastType.ERROR, message.msg);
      sendResponse({ data: 'load-done' });
      return true;
    default:
      sendResponse({ data: 'load-done' });
      return true;
  }
});
