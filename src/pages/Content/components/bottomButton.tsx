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
import getLang from '../utils/api/getLang';
import getSubs from '../utils/api/getSubs';
import { getNotices } from '../utils/api/notice';
import video from '../utils/api/video';
import getTab from '../utils/getTab';
import componentLoader, { AttachType } from '../helpers/componentLoader';
import CSSResetCustom from './cssResetCustom';
import { SubcloudIcon } from './icons';
import MainModal from './mainModal';
import getFile from '../utils/api/getFile';
import subView from '../utils/api/subView';

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
        parentQueries: ['body'],
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

type Sub = {
  id: string;
  lang: string;
  rating: number;
  views: number;
  userName: string;
  userId: string;
  uploadDate: Date;
};

export default function BottomButton() {
  const t = chrome.i18n.getMessage;
  const [onOff, setOnOff] = useState<boolean>(false);
  const [notifyCount, setNotifyCount] = useState<number>(0);
  const [baseLangSub, setBaseLangSub] = useState<Sub | undefined>();
  const [baseLang, setBaseLang] = useState<string>('한국어');

  useEffect(() => {
    const getNoticeCount = async () => {
      const notices = await getNotices();
      setNotifyCount(notices.filter((notice: any) => !notice.checked).length);
    };

    const getLangs = async () => {
      const { baseLangs } = await getLang();
      if (baseLangs && baseLangs.length > 0) setBaseLang(baseLangs[0]);
    };

    const getHasSub = async () => {
      const tab = await getTab();
      const videoData = await video(tab.url);
      const subs = await getSubs(videoData?.videoId, videoData?.serviceId);
      let sub;
      for (let i = 0; i < subs.length; i += 1) {
        if (subs[i].lang === baseLang && (!sub || sub.views < subs[i].views)) {
          sub = subs[i];
        }
      }
      setBaseLangSub(sub);
      const result = await chrome.storage.local.get(['isQuickSub']);
      if (sub?.id && result.isQuickSub) {
        const file = await getFile(sub?.id);
        await chrome.storage.local.set({
          subtitle: { data: JSON.stringify(file), url: tab.url },
        });
        await subView(sub.id);
      }
    };

    const init = async () => {
      try {
        await getNoticeCount();
        await getLangs();
        await getHasSub();
      } catch (error: unknown) {
        if (error instanceof Error) console.log('server error');
      }
    };
    init();
  }, [baseLang]);

  useEffect(() => {
    try {
      chrome.storage.local.get(['onOff'], (result) => {
        if (result.onOff !== undefined) setOnOff(result.onOff);
      });
    } catch (error: unknown) {
      if (error instanceof Error) console.log('server error');
    }
  }, []);

  useEffect(() => {
    try {
      chrome.storage.local.set({ onOff });
    } catch (error: unknown) {
      if (error instanceof Error) console.log('server error');
    }
  }, [onOff]);

  return (
    <Flex flexDir="row" alignItems="center !important" h="100%" ml="-8px">
      <Tooltip
        label={<span>{t('BottomButton_switch_tooltip')}</span>}
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
              <b>{t('BottomButton_button_defaultTooltip')}</b>
            </span>
            {baseLangSub && (
              <>
                <br />
                <span>
                  {t('BottomButton_button_subtitleTooltip1')} {baseLang}{' '}
                  {t('BottomButton_button_subtitleTooltip2')}
                </span>
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
          {(baseLangSub || notifyCount > 0) && (
            <Text
              bg="red"
              fontSize="12px"
              borderRadius="6px"
              position="absolute"
              pl="5px"
              pr="4px"
              ml={baseLangSub ? '16px' : '13px'}
              mt="-32px"
              className={
                baseLangSub ? 'subcloud-base-lang' : 'subcloud-notify-count'
              }
            >
              {baseLangSub ? '!' : notifyCount}
            </Text>
          )}
        </Box>
      </Tooltip>
    </Flex>
  );
}
