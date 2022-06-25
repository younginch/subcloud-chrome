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
import ThemeToggleBtn from './themeToggleBtn';

export default function Layout() {
  return (
    <VStack>
      <HStack w="100%">
        <Heading>SubCloud</Heading>
        <Spacer />
        <ThemeToggleBtn />
        <Spacer />
        <PopoverCloseButton />
      </HStack>
      <Tabs w="fit-content" h="fit-content">
        <TabList borderBottom="1px">
          <Tab>One</Tab>
          <Tab>Two</Tab>
          <Tab>Three</Tab>
        </TabList>
        <Box w="30vw" maxW="30vw" h="30vw" maxH="30vw">
          <TabPanels>
            <TabPanel p={0}>
              <Home />
            </TabPanel>
            <TabPanel p={0}>
              <p>two!</p>
            </TabPanel>
            <TabPanel p={0}>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Box>
      </Tabs>
    </VStack>
  );
}
