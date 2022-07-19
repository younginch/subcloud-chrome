/* eslint-disable import/no-cycle */
import {
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Box,
  VStack,
  HStack,
  Heading,
  Spacer,
  Flex,
  Text,
  Avatar,
  AvatarBadge,
  Stack,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import {
  AiFillHome,
  AiFillSetting,
  AiOutlineCloseCircle,
} from 'react-icons/ai';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { MdSubtitles } from 'react-icons/md';
import { IoMdCloudUpload } from 'react-icons/io';
import { BellIcon } from '@chakra-ui/icons';
import { getFetch } from '../utils/fetch';
import Subtitle, { SubtitleType } from '../tabs/subtitle';
import Upload from '../tabs/upload';
import Setting from '../tabs/setting';
import HomeNoSub from '../tabs/homeNoSub';
import toast, { ToastType } from '../utils/toast';
import { MESSAGETAG, User, Video } from '../../../../utils/type';
import { closeMainModal } from '../helpers/modalControl';
import getSubs from '../utils/api/getSubs';
import Notify from '../tabs/notify';
import HomeLoginFirst from '../tabs/homeLoginFirst';
import video from '../utils/api/video';
import getTab from '../utils/getTab';
import { getNotices } from '../utils/api/notice';
import { NotificationType, NotifyType } from '../utils/notify';
import createTab from '../utils/createTab';

type TabType = {
  icon: React.ReactNode;
  name: string;
};

export default function Layout() {
  const [user, setUser] = useState<User>();
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [videoData, setVideoData] = useState<Video>();
  const [subs, setSubs] = useState<SubtitleType[]>([]);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [unreadNotifications, setUnreadNotifications] = useState<
    NotificationType[]
  >([]);
  const [readNotifications, setReadNotifications] = useState<
    NotificationType[]
  >([]);
  const [url, setUrl] = useState<string>();

  const tabs: Array<TabType> = [
    { icon: <AiFillHome size={20} />, name: 'Home' },
    { icon: <MdSubtitles size={20} />, name: 'Subtitle' },
    { icon: <IoMdCloudUpload size={20} />, name: 'Upload' },
    { icon: <AiFillSetting size={20} />, name: 'Setting' },
  ];

  async function getUrl() {
    setUrl(window.location.href);
  }

  async function getUserInfo() {
    try {
      const { data } = await getFetch('auth/session');
      if (data && data.user) {
        setUser({
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          image: data.user.image,
          point: data.user.point,
        });
        setIsLogin(true);
      }
    } catch (error: unknown) {
      if (error instanceof Error) toast(ToastType.ERROR, 'Server error');
    }
  }

  const getInfo = useCallback(async () => {
    async function getVideoInfo() {
      try {
        if (url) {
          const data = await video(url);
          setVideoData(data);
        }
      } catch (error: unknown) {
        if (error instanceof Error) toast(ToastType.ERROR, 'Server error'); // maybe change to console.log other ways
      }
    }

    async function getSubInfo() {
      try {
        if (videoData?.videoId && videoData?.serviceId) {
          const data = await getSubs(videoData?.videoId, videoData?.serviceId);
          setSubs(data);
          if (data.length !== 0) setTabIndex(1);
        }
      } catch (error: unknown) {
        if (error instanceof Error) toast(ToastType.ERROR, 'Server error'); // maybe change to console.log or other ways
      }
    }

    async function getNoticeInfo() {
      try {
        dayjs.extend(relativeTime);
        const notices = await getNotices();
        const read = [];
        const unread = [];
        for (let i = 0; i < notices.length; i += 1) {
          const notification = notices[i];
          let title = '';
          switch (notification.notice.type) {
            case NotifyType.ANNOUNCE:
              title = '공지사항';
              break;
            case NotifyType.NEW_SUBTITLE:
              title = '자막 업로드 알림';
              break;
            case NotifyType.REVIEW:
              title = '리뷰 알림';
              break;
            default:
              title = '';
          }
          const e = {
            id: notification.id,
            notifyType: notification.notice.type,
            title,
            time: dayjs(notification.notice.createdAt).fromNow(),
            content: notification.notice.message,
            href: notification.notice.url,
          };
          if (notification.checked) {
            read.push(e);
          } else {
            unread.push(e);
          }
        }
        setReadNotifications(read);
        setUnreadNotifications(unread);
      } catch (error: unknown) {
        if (error instanceof Error) toast(ToastType.ERROR, 'Server error'); // maybe change to console.log or other ways
      }
    }
    if (isLogin) {
      await getVideoInfo();
      await getSubInfo();
      await getNoticeInfo();
    }
  }, [videoData?.serviceId, videoData?.videoId, url, isLogin]);

  useEffect(() => {
    const init = async () => {
      await getUrl();
      await getUserInfo();
      await getInfo();
    };
    init();
  }, [getInfo]);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  useEffect(() => {
    const createListener = async (
      message: any,
      sender: any,
      sendResponse: any
    ) => {
      switch (message.tag) {
        case MESSAGETAG.LOGOUT:
          setIsLogin(false);
          setTabIndex(0);
          sendResponse({ data: 'load-done' });
          return true;
        case MESSAGETAG.LOGIN:
          if (!isLogin) {
            await getUserInfo();
            await getInfo();
          }
          sendResponse({ data: 'load-done' });
          return true;
        default:
          sendResponse({ data: 'load-done' });
          return true;
      }
    };
    chrome.runtime.onMessage.addListener(createListener);

    return () => {
      chrome.runtime.onMessage.removeListener(createListener);
    };
  }, [getInfo, isLogin]);

  return (
    <VStack
      w="850px"
      h="600px"
      bg="bgColor.500"
      borderRadius="10px"
      overflow="hidden"
      boxShadow="dark-lg"
      color="white"
    >
      <HStack
        w="100%"
        h="40px"
        p="7px"
        bg="bgColor.800"
        borderBottomWidth="1px"
        borderColor="gray.600"
      >
        <Heading
          fontSize="3xl"
          ml="15px !important"
          onClick={async () => {
            await createTab(`${API_URL}`);
          }}
          cursor="pointer"
        >
          SubCloud
        </Heading>
        <Spacer />
        <AiOutlineCloseCircle
          size={20}
          onClick={() => closeMainModal()}
          cursor="pointer"
        />
      </HStack>
      <Tabs
        index={tabIndex}
        onChange={handleTabsChange}
        orientation="vertical"
        mt="0px !important"
        h="560px"
        isLazy
      >
        <HStack>
          <Flex
            direction="column"
            h="100%"
            justifyContent="space-between"
            bg="bgColor.800"
            borderColor="gray.600"
            borderRightWidth="1px"
          >
            <TabList
              w="150px"
              maxW="150px"
              m="0px !important"
              border="none"
              overflow="hidden"
            >
              {tabs.map((tab: TabType, index) => (
                <Tab
                  key={tab.name}
                  _selected={{ color: 'white', bg: 'blue.500' }}
                  fontSize="14px"
                  justifyContent="flex-start"
                  h="40px"
                  isDisabled={index > 0 && !isLogin}
                >
                  <HStack spacing="15px" pl="18px">
                    {tab.icon}
                    <Text>{tab.name}</Text>
                  </HStack>
                </Tab>
              ))}
            </TabList>
            <Stack
              alignItems="center"
              mb="20px"
              spacing="20px"
              hidden={!isLogin}
            >
              <Box
                w="40px"
                h="40px"
                position="relative"
                cursor="pointer"
                onClick={() => setTabIndex(4)}
                color={tabIndex === 4 ? 'blue.500' : 'white'}
              >
                <BellIcon w="40px" h="40px" color="inherit" />
                {unreadNotifications.length > 0 && (
                  <Text
                    bg="red"
                    fontSize="14px"
                    borderRadius="6px"
                    position="absolute"
                    pl="3px"
                    pr="3px"
                    ml="20px"
                    mt="-40px"
                    color="white"
                  >
                    {unreadNotifications.length}
                  </Text>
                )}
              </Box>
              <Avatar
                w="40px"
                h="40px"
                cursor="pointer"
                src={user?.image}
                onClick={() => {
                  createTab(`${API_URL}/user/my`);
                }}
              >
                <AvatarBadge boxSize="1.25em" bg="green.500" />
              </Avatar>
            </Stack>
          </Flex>
          <Box w="700px" h="100%" m="0px !important" overflow="hidden">
            <TabPanels>
              <TabPanel p={0}>
                {isLogin ? (
                  <HomeNoSub videoData={videoData} />
                ) : (
                  <HomeLoginFirst />
                )}
              </TabPanel>
              <TabPanel p={0}>
                <Subtitle subs={subs} userId={user?.id} />
              </TabPanel>
              <TabPanel p={0}>
                <Upload />
              </TabPanel>
              <TabPanel p={0}>
                <Setting user={user} />
              </TabPanel>
              <TabPanel p={0}>
                <Notify
                  readNotifications={readNotifications}
                  unreadNotifications={unreadNotifications}
                  setReadNotifications={setReadNotifications}
                  setUnreadNotifications={setUnreadNotifications}
                />
              </TabPanel>
            </TabPanels>
          </Box>
        </HStack>
      </Tabs>
    </VStack>
  );
}
