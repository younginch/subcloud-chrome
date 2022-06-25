import {
  Box,
  Heading,
  HStack,
  Spacer,
  Tabs,
  VStack,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Button,
  ModalCloseButton,
} from '@chakra-ui/react';
import { GrClose } from 'react-icons/gr';
import App from '../tabs/App';

export default function Layout() {
  return (
    <VStack>
      <HStack>
        <Heading>SubCloud</Heading>
        <Spacer />
        <ModalCloseButton />
      </HStack>
      <Tabs>
        <HStack>
          <VStack>
            <Tab>One</Tab>
            <Tab>Two</Tab>
            <Tab>Three</Tab>
          </VStack>
          <Box w="30vw" maxW="30vw" h="30vh" maxH="30vh">
            <TabPanels>
              <TabPanel>
                <App />
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
              <TabPanel>
                <p>three!</p>
              </TabPanel>
            </TabPanels>
          </Box>
        </HStack>
      </Tabs>
      <HStack>
        <Spacer />
        <Button>닫기</Button>
      </HStack>
    </VStack>
  );
}
