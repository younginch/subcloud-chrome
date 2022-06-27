import {
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Box,
  VStack,
  Spacer,
  PopoverHeader,
  HStack,
  PopoverCloseButton,
  Text,
  Heading,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Home from '../tabs/Home';
import Subtitle from '../tabs/Subtitle';
import Upload from '../tabs/Upload';
import ThemeToggleBtn from './themeToggleBtn';
import Setting from '../tabs/Setting';
import CustomHeader from './CustomHeader';
import { getFetch } from '../utils/fetch';

export default function Layout() {
  const [user, setUser] = useState({ name: 'fuck' });

  async function getUserInfo() {
    const data = await getFetch('auth/session');
    setUser(data.user);
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <VStack>
      <CustomHeader />
      <Tabs w="fit-content" h="fit-content">
        <TabList borderBottom="1px">
          <Tab>Home</Tab>
          <Tab>Subtitle</Tab>
          <Tab>Upload</Tab>
          <Tab>Setting</Tab>
        </TabList>
        <Box w="30vw" maxW="30vw" h="30vw" maxH="30vw" overflow="hidden">
          <TabPanels>
            <TabPanel p={0}>
              <Home />
            </TabPanel>
            <TabPanel p={0}>
              <Subtitle />
            </TabPanel>
            <TabPanel p={0}>
              <Upload />
            </TabPanel>
            <TabPanel p={0}>
              <Setting />
            </TabPanel>
          </TabPanels>
        </Box>
      </Tabs>
    </VStack>
  );
}
