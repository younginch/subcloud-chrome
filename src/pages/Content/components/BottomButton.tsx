import {
  Box,
  Button,
  Fade,
  Flex,
  Switch,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { MdSubtitles } from 'react-icons/md';
import Layout from '../layout';
import { SubcloudIcon } from './icons';

export default function BottomButton() {
  const [onOff, setOnOff] = useState<boolean>(false);
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Flex flexDir="row" alignItems="center !important" h="100%">
      <Switch
        colorScheme="red"
        size="lg"
        checked={onOff}
        onChange={() => setOnOff(!onOff)}
      />
      <Box
        onClick={onToggle}
        hidden={!onOff}
        w="25px"
        h="25px"
        ml="8px"
        p="0px !important"
        position="relative"
        cursor="pointer"
      >
        <SubcloudIcon size="30px" fill="white" marginTop="-12px" />
        <Text
          bg="red"
          fontSize="12px"
          borderRadius="6px"
          position="absolute"
          pl="4px"
          pr="4px"
          ml="13px"
          mt="-20px"
        >
          20
        </Text>
      </Box>
      <Fade in={isOpen} hidden={!isOpen}>
        <Layout />
      </Fade>
    </Flex>
  );
}
