import {
  Box,
  ChakraProvider,
  extendTheme,
  Flex,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Switch from 'react-switch';
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';
import componentLoader, { AttachType } from '../helpers/componentLoader';
import { getNotices } from '../utils/api/notice';
import toast, { ToastType } from '../utils/toast';
import CSSResetCustom from './cssResetCustom';
import { SubcloudIcon } from './icons';
import MainModal from './mainModal';
import getTab from '../utils/getTab';

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

const onClickBtn = async () => {
  const mainModal = document.getElementById('subcloud-main-modal');
  const tab = await getTab();

  if (mainModal) {
    const { load } = await chrome.storage.local.get(['load']);
    if (!load || load.url !== tab.url) {
      mainModal.remove();
    } else if (mainModal.classList.contains('modal-visible')) {
      mainModal.classList.remove('modal-visible');
      return;
    } else {
      mainModal.classList.add('modal-visible');
      return;
    }
  }

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
      chrome.storage.local.set({
        load: {
          url: tab.url,
        },
      });
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
};

export default function BottomButton() {
  const [onOff, setOnOff] = useState<boolean>(false);
  const [notifyCount, setNotifyCount] = useState<number>(0);
  const [hasSub, setHasSub] = useState<boolean>(false);
  const [baseLang, setBaseLang] = useState<string>('한국어');

  const getNoticeCount = async () => {
    const notices = await getNotices();
    setNotifyCount(notices.filter((notice: any) => !notice.checked).length);
  };

  useEffect(() => {
    const init = async () => {
      try {
        await getNoticeCount();
        chrome.storage.local.get(['onOff'], (result) => {
          if (result.onOff !== undefined) setOnOff(result.onOff);
        });
      } catch (error: unknown) {
        if (error instanceof Error) toast(ToastType.ERROR, error.message);
      }
    };
    init();
  }, []);

  useEffect(() => {
    chrome.storage.local.set({ onOff });
  }, [onOff]);

  return (
    <Flex flexDir="row" alignItems="center !important" h="100%" ml="-8px">
      <Tooltip
        label={<span>Subcloud 자막 On/Off</span>}
        placement="top"
        bg="rgba(0,0,0,0.5)"
        color="white"
        fontSize="14px"
        mb="18px"
        ml="6px"
      >
        <Box mt="3px">
          <Switch
            checked={onOff}
            onChange={() => setOnOff(!onOff)}
            onColor="#86d3ff"
            handleDiameter={32}
            uncheckedIcon={false}
            checkedIcon={false}
            height={13}
            width={33}
            checkedHandleIcon={<SubcloudIcon size="32px" fill="white" />}
            uncheckedHandleIcon={<SubcloudIcon size="32px" fill="white" />}
          />
        </Box>
      </Tooltip>

      <Tooltip
        label={
          <>
            <span>
              <b>SubCloud</b>
            </span>
            {hasSub && (
              <>
                <br />
                <span>영상에 {baseLang} 자막이 있습니다</span>
              </>
            )}
          </>
        }
        placement="top"
        bg="rgba(0,0,0,0.5)"
        color="white"
        fontSize="14px"
        mb="18px"
        ml="6px"
      >
        <Box
          hidden={!onOff}
          w="30px"
          h="30px"
          ml="8px"
          p="0px !important"
          position="relative"
          cursor="pointer"
          title="subcloud"
          onClick={() => onClickBtn()}
        >
          <SubcloudIcon size="30px" fill="white" />
          {(hasSub || notifyCount > 0) && (
            <Text
              bg="red"
              fontSize="12px"
              borderRadius="6px"
              position="absolute"
              pl="5px"
              pr="4px"
              ml={hasSub ? '16px' : '13px'}
              mt="-32px"
            >
              {hasSub ? '!' : notifyCount}
            </Text>
          )}
        </Box>
      </Tooltip>
    </Flex>
  );
}
