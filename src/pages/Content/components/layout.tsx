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
import { useEffect, useState } from 'react';
import {
  AiFillHome,
  AiFillSetting,
  AiOutlineCloseCircle,
} from 'react-icons/ai';
import { MdSubtitles } from 'react-icons/md';
import { IoMdCloudUpload } from 'react-icons/io';
import { BellIcon } from '@chakra-ui/icons';
import { getFetch } from '../utils/fetch';
import Subtitle, { SubtitleType } from '../tabs/subtitle';
import Upload from '../tabs/upload';
import Setting from '../tabs/setting';
import HomeNoSub from '../tabs/homeNoSub';
import toast, { ToastType } from '../utils/toast';
import { User } from '../../../../utils/type';
import { closeMainModal } from '../helpers/modalControl';
import getSubs from '../utils/api/getSubs';
import Notify from '../tabs/notify';
import HomeLoginFirst from '../tabs/homeLoginFirst';

type TabType = {
  icon: React.ReactNode;
  name: string;
};

export default function Layout() {
  const [user, setUser] = useState<User | undefined>();
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [subs, setSubs] = useState<SubtitleType[]>([]);

  const tabs: Array<TabType> = [
    { icon: <AiFillHome size={20} />, name: 'Home' },
    { icon: <MdSubtitles size={20} />, name: 'Subtitle' },
    { icon: <IoMdCloudUpload size={20} />, name: 'Upload' },
    { icon: <AiFillSetting size={20} />, name: 'Setting' },
  ];

  async function getUserInfo() {
    try {
      const data = await getFetch('auth/session');
      setUser({
        name: data.user.name,
        email: data.user.email,
        image: data.user.image,
        point: data.user.point,
      });
    } catch (error: unknown) {
      if (error instanceof Error) toast(ToastType.ERROR, error.message);
    }
  }

  async function getSubInfo() {
    try {
      const data = await getSubs();
      setSubs(data);
      if (data.length !== 0) setTabIndex(1);
    } catch (error: unknown) {
      if (error instanceof Error) toast(ToastType.ERROR, error.message);
    }
  }

  useEffect(() => {
    const init = async () => {
      await getUserInfo();
      await getSubInfo();
    };
    init();
  }, []);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <VStack
      w="850px"
      h="600px"
      bg="bgColor.500"
      borderRadius="10px"
      overflow="hidden"
      boxShadow="dark-lg"
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
          onClick={() => {
            window.location.href = 'https://subcloud.app';
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
              {tabs.map((tab: TabType) => (
                <Tab
                  key={tab.name}
                  _selected={{ color: 'white', bg: 'blue.500' }}
                  fontSize="14px"
                  justifyContent="flex-start"
                  h="40px"
                >
                  <HStack spacing="15px" pl="18px">
                    {tab.icon}
                    <Text>{tab.name}</Text>
                  </HStack>
                </Tab>
              ))}
            </TabList>
            <Stack alignItems="center" mb="20px" spacing="20px">
              <Box
                w="40px"
                h="40px"
                position="relative"
                cursor="pointer"
                onClick={() => setTabIndex(4)}
                color={tabIndex === 4 ? 'blue.500' : 'white'}
              >
                <BellIcon w="40px" h="40px" color="inherit" />
                <Text
                  bg="red"
                  fontSize="14px"
                  borderRadius="6px"
                  position="absolute"
                  pl="3px"
                  pr="3px"
                  ml="18px"
                  mt="-40px"
                  color="white"
                >
                  20
                </Text>
              </Box>
              <Avatar
                w="40px"
                h="40px"
                cursor="pointer"
                src={user?.image}
                onClick={() => {
                  window.location.href = 'https://subcloud.app/user/my';
                }}
              >
                <AvatarBadge boxSize="1.25em" bg="green.500" />
              </Avatar>
            </Stack>
          </Flex>
          <Box w="700px" h="100%" m="0px !important" overflow="hidden">
            <TabPanels>
              <TabPanel p={0}>
                {false ? <HomeNoSub /> : <HomeLoginFirst />}
              </TabPanel>
              <TabPanel p={0}>
                <Subtitle subs={subs} />
              </TabPanel>
              <TabPanel p={0}>
                <Upload />
              </TabPanel>
              <TabPanel p={0}>
                <Setting user={user} />
              </TabPanel>
              <TabPanel p={0}>
                <Notify />
              </TabPanel>
            </TabPanels>
          </Box>
        </HStack>
      </Tabs>
    </VStack>
  );
}
