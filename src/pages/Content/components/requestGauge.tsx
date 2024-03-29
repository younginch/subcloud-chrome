import { CloseIcon, SmallAddIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  HStack,
  Link,
  Progress,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import DefaultLang from '../utils/api/defaultLang';
import requestPoint from '../utils/api/requestPoint';
import video from '../utils/api/video';
import { getFetch } from '../utils/fetch';
import PointGoal from '../utils/pointGoal';
import toast, { ToastType } from '../utils/toast';
import SelectLang from './selectLang';

type YoutubeVideo = {
  id: string;
  channelId: string;
  publishedAt: Date;
  title: string;
  description: string;
  duration: number;
  viewCount: number;
  likeCount: number;
};

type Video = {
  url: string;
  serviceId: string;
  videoId: string;
  youtubeVideoId: string;
  youtubeVideo?: YoutubeVideo;
};

export default function RequestGauge() {
  const t = chrome.i18n.getMessage;
  const [point, setPoint] = useState<number>(0);
  const [goal, setGoal] = useState<number>(100000);
  const [lang, setLang] = useState<string | undefined>();
  const [videoInfo, setVideoInfo] = useState<Video>();
  const [goalExpr, setGoalExpr] = useState();
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    async function getExpr() {
      fetch('https://strapi.subcloud.app/api/goal-function')
        .then((res) => res.json())
        .then((data) => setGoalExpr(data.data.attributes.body));
    }
    async function getUserInfo() {
      try {
        const { data } = await getFetch('auth/session');
        if (data && data.user) {
          setIsLogin(true);
        }
      } catch (error: unknown) {
        if (error instanceof Error) console.log('server error');
      }
    }
    async function getLang() {
      try {
        const vInfo = await video(window.location.href);
        setVideoInfo(vInfo);
        const result = await chrome.storage.local.get(['barLang']);
        const barLang = result ? result.barLang : undefined;
        if (
          barLang &&
          barLang.language &&
          barLang.url === window.location.href
        ) {
          setLang(barLang.language);
        } else {
          const defaultLang = await DefaultLang(
            vInfo?.serviceId,
            vInfo?.videoId
          );
          setLang(defaultLang);
        }
      } catch (error: unknown) {
        if (error instanceof Error) console.log('server error');
      }
    }
    const init = async () => {
      getExpr();
      await getUserInfo();
      await getLang();
    };
    init();
  }, []);

  useEffect(() => {
    setGoal(PointGoal(videoInfo?.youtubeVideo?.duration, goalExpr) ?? 100000);
  }, [goalExpr, videoInfo]);

  useEffect(() => {
    async function getPoint() {
      try {
        if (lang)
          await chrome.storage.local.set({
            barLang: { language: lang, url: window.location.href },
          });
        const rpoint = await requestPoint(
          videoInfo?.serviceId,
          videoInfo?.videoId,
          lang
        );
        setPoint(rpoint);
      } catch (error: unknown) {
        if (error instanceof Error) console.log('server error');
      }
    }
    getPoint();
  }, [isLogin, lang, videoInfo, goalExpr]);

  let color = 'blue';
  if (point >= goal / 2) color = 'purple';
  if (point >= goal) color = 'red';

  const handleHide = () => {
    chrome.storage.local.set({ barShow: false });
    toast(ToastType.INFO, t('RequestGauge_hideToast'), 4000);
  };

  return isLogin ? (
    <HStack w="100%">
      <Text color="#00d9d9" fontWeight="bold" fontSize="17px">
        SubCloud
      </Text>
      <Tooltip
        label={`${t('RequestGauge_gauge')}: ${point}/${goal}`}
        fontSize="15px"
      >
        <Box w="full" ml="7px !important" mr="7px !important">
          <Progress
            hasStripe
            value={(point / goal) * 100}
            colorScheme={color}
            bg="rgba(220,220,220,.2)"
            h="13px"
          />
        </Box>
      </Tooltip>
      <Link
        href={
          videoInfo
            ? `${API_URL}/video/${videoInfo.serviceId}/${videoInfo.videoId}/request/create?lang=${lang}`
            : ''
        }
        isExternal
      >
        <Button
          colorScheme="green"
          h="25px"
          fontSize="13px"
          leftIcon={<SmallAddIcon />}
          borderRadius="7px"
        >
          {t('RequestGauge_request')}
        </Button>
      </Link>
      <SelectLang
        width={140}
        height={28}
        delta={20}
        mainFont="13px"
        subFont="13px"
        lang={lang}
        clickEvent={setLang}
        bg="rgba(120,120,120,.3)"
        hoverBg="rgba(100,100,100,.2)"
        activeBg="rgba(130,160,180,.3)"
      />
      <Button
        colorScheme="gray"
        h="25px"
        fontSize="13px"
        onClick={() => handleHide()}
      >
        <CloseIcon />
      </Button>
    </HStack>
  ) : (
    <HStack w="100%">
      <Text color="#00d9d9" fontWeight="bold" fontSize="17px">
        SubCloud
      </Text>
      <Link
        href={`${API_URL}/auth/signin?callbackUrl=${window.location.href}`}
        isExternal
      >
        <Button colorScheme="green" h="25px" fontSize="13px" borderRadius="7px">
          {t('RequestGauge_loginBtn')}
        </Button>
      </Link>
    </HStack>
  );
}
