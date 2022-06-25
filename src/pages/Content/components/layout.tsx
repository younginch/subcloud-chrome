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
} from '@chakra-ui/react';
import { GrClose } from 'react-icons/gr';
import App from '../tabs/App';

export default function Layout() {
  return (
    <VStack>
      <HStack>
        <Heading>SubCloud</Heading>
      </HStack>
      <Tabs>
        <HStack>
          <VStack>
            <Tab>One</Tab>
            <Tab>Two</Tab>
            <Tab>Three</Tab>
          </VStack>
          <Box>
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
    </VStack>
  );
}
