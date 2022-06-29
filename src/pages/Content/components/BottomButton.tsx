import {
  Box,
  Button,
  Flex,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Switch,
} from '@chakra-ui/react';
import { useState } from 'react';
import { MdSubtitles } from 'react-icons/md';
import Layout from './layout';
import RequestButton from './RequestButton';

export default function BottomButton() {
  const [onOff, setOnOff] = useState<boolean>(false);
  return (
    <Flex flexDir="row" alignItems="center !important" h="100%">
      <Switch
        colorScheme="red"
        size="lg"
        checked={onOff}
        onChange={() => setOnOff(!onOff)}
      />
      <Popover variant="responsive" placement="top-start" isLazy>
        <PopoverTrigger>
          <Box
            as={Button}
            hidden={!onOff}
            w="25px"
            h="25px"
            ml="8px"
            p="0px !important"
          >
            <MdSubtitles size="25px" />
          </Box>
        </PopoverTrigger>
        <PopoverContent w="fit-content" h="fit-content">
          <Layout />
        </PopoverContent>
      </Popover>
      <RequestButton />
    </Flex>
  );
}
