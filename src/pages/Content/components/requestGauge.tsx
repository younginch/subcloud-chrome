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
import requestPoint from '../utils/api/requestPoint';
import video from '../utils/api/video';
import { getFetch } from '../utils/fetch';
import getTab from '../utils/getTab';
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
    getExpr();
  }, []);

  useEffect(() => {
    setGoal(PointGoal(videoInfo?.youtubeVideo?.duration, goalExpr) ?? 100000);
  }, [goalExpr, videoInfo]);

  useEffect(() => {
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

    async function getPoint() {
      try {
        if (isLogin) {
          const tab = await getTab();
          const vInfo = await video(tab.url);
          setVideoInfo(vInfo);
          const rpoint = await requestPoint(
            vInfo.serviceId,
            vInfo.videoId,
            lang
          );
          setPoint(rpoint);
        }
      } catch (error: unknown) {
        if (error instanceof Error) console.log('server error');
      }
    }

    const init = async () => {
      await getUserInfo();
      await getPoint();
    };
    init();
  }, [goalExpr, lang, isLogin]);

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
        label={`${t('RequestGauge_hideToast')}: ${point}/${goal}`}
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
          {t('RequestGauge_gauge')}
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
    <> </>
  );
}
