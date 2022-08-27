import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { MESSAGETAG } from '../../../utils/type';
import BottomButton from './components/bottomButton';
import SubtitleComponent from './components/subtitleComponent';
import ToastComponent from './components/toastComponent';
import CSSResetCustom from './components/cssResetCustom';
import { ToastType } from './utils/toast';
import ReviewComponent from './components/reviewComponent';
import { closeMainModal } from './helpers/modalControl';
import RequestGauge from './components/requestGauge';
import componentLoader, { AttachType } from './helpers/componentLoader';

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
        parentQueries: ['#movie_player'],
        targetId: 'subcloud-review-component',
        children: <ReviewComponent duration={6000} subId={subId} />,
      })
    )
      clearInterval(loadReviewComponent);
  }, 100);
};

const loadGauge = () => {
  fetch('https://strapi.subcloud.app/api/extension-config')
    .then((res) => res.json())
    .then((data) => {
      const loadRequestGauge = setInterval(() => {
        if (
          componentLoader({
            parentQueries: data?.data?.attributes?.body?.RequestGauge ?? [
              'div.ytd-watch-metadata#title',
              'div.ytd-video-primary-info-renderer#container',
            ],
            targetId: 'subcloud-gauge-component',
            children: (
              <chakra-scope>
                <ChakraProvider theme={theme} resetCSS={false}>
                  <CSSResetCustom />
                  <RequestGauge />
                </ChakraProvider>
              </chakra-scope>
            ),
          })
        )
          clearInterval(loadRequestGauge);
      }, 100);
    });
};

const load = () => {
  // Load Toast component
  const loadToast = setInterval(() => {
    if (
      componentLoader({
        parentQueries: ['body'],
        targetId: 'subcloud-toast',
        className: 'bootstrap',
        children: <ToastComponent />,
      })
    )
      clearInterval(loadToast);
  }, 100);

  const loadVideoBottomButton = setInterval(() => {
    if (
      componentLoader({
        parentQueries: [
          'div#container div.ytp-chrome-controls div.ytp-left-controls .ytp-volume-area',
        ],
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
        parentQueries: ['#movie_player'],
        targetId: 'subcloud-sub-component',
        children: <SubtitleComponent />,
      })
    )
      clearInterval(loadSubtitleComponent);
  }, 100);
};

window.onload = load;

chrome.storage.local.get(['barShow'], (result) => {
  if (result.barShow === true) loadGauge();
});

chrome.storage.onChanged.addListener((onChanged) => {
  if (onChanged.barShow !== undefined) {
    if (onChanged.barShow.newValue === false) {
      const menuModal = document.getElementById('subcloud-gauge-component');
      if (menuModal) menuModal.remove();
    } else loadGauge();
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.tag) {
    case MESSAGETAG.INIT:
      closeMainModal();
      load();
      chrome.storage.local.get(['barShow'], (result) => {
        if (result.barShow === true) loadGauge();
      });
      sendResponse({ data: 'load-done' });
      return true;
    case MESSAGETAG.TOAST:
      toast(message.toastType, message.msg, message.delay);
      sendResponse({ data: 'toast' });
      return true;
    case MESSAGETAG.REVIEW:
      loadReview(message.subId);
      sendResponse({ data: 'review' });
      return true;
    case MESSAGETAG.LOGIN:
    case MESSAGETAG.LOGOUT:
      chrome.storage.local.get(['barShow'], (result) => {
        if (result.barShow === true) loadGauge();
      });
      return true;
    default:
      sendResponse({ data: 'load-done' });
      return true;
  }
});
