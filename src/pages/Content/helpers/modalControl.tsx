import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';
import CSSResetCustom from '../components/cssResetCustom';
// eslint-disable-next-line import/no-cycle
import MainModal from '../components/mainModal';
import componentLoader, { AttachType } from './componentLoader';

// eslint-disable-next-line import/prefer-default-export
export const closeMainModal = () => {
  const mainModal = document.getElementById('subcloud-main-modal');
  if (!mainModal) return false;
  mainModal.classList.remove('modal-visible');
  return true;
};

const theme = extendTheme({
  initialColorMode: 'dark',
  useSystemColorMode: false,
  components: {
    Steps,
  },
  colors: {
    bgColor: {
      200: '#26303E',
      300: '#232C39',
      500: '#1A202C',
      800: '#1C1E21',
    },
  },
});

export const toggleMainModal = () => {
  const mainModal = document.getElementById('subcloud-main-modal');
  if (!mainModal) {
    const loadMainModal = setInterval(() => {
      if (
        componentLoader({
          parentQuery: 'body',
          targetId: 'subcloud-main-modal-placer',
          children: (
            <chakra-scope>
              <ChakraProvider theme={theme} resetCSS={false}>
                <CSSResetCustom />
                <MainModal />
              </ChakraProvider>
            </chakra-scope>
          ),
          attachType: AttachType.PREPEND,
        })
      ) {
        clearInterval(loadMainModal);
      }
    }, 100);
    let iterations = 0;
    const openMainModal = setInterval(() => {
      iterations += 1;
      const newModal = document.getElementById('subcloud-main-modal');
      if (iterations > 20) {
        clearInterval(openMainModal);
      }
      if (newModal) {
        newModal.classList.add('modal-visible');
        clearInterval(openMainModal);
      }
    }, 400);
    return true;
  }

  if (!mainModal) return false;
  if (mainModal.classList.contains('modal-visible')) {
    mainModal.classList.remove('modal-visible');
  } else {
    mainModal.classList.add('modal-visible');
  }
  return true;
};
