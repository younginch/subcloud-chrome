import {
  Box,
  Button,
  Fade,
  Flex,
  Switch,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { MdSubtitles } from 'react-icons/md';
import Layout from '../layout';

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
        as={Button}
        onClick={onToggle}
        hidden={!onOff}
        w="25px"
        h="25px"
        ml="8px"
        p="0px !important"
      >
        <MdSubtitles size="25px" />
      </Box>
      <Fade in={isOpen} hidden={!isOpen}>
        <Layout />
      </Fade>
    </Flex>
  );
}
