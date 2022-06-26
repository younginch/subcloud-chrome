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
import Home from '../tabs/Home';
import Subtitle from '../tabs/Subtitle';
import Request from '../tabs/Request';
import ThemeToggleBtn from './themeToggleBtn';
import Setting from '../tabs/Setting';
import CustomHeader from './CustomHeader';

export default function Layout() {
  return (
    <VStack>
      <CustomHeader />
      <Tabs w="fit-content" h="fit-content">
        <TabList borderBottom="1px">
          <Tab>Home</Tab>
          <Tab>Subtitle</Tab>
          <Tab>Request</Tab>
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
              <Request />
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
