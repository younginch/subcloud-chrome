import { Box, Flex, Switch } from '@chakra-ui/react';
import { useState } from 'react';
import { MdSubtitles } from 'react-icons/md';
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
      <Box hidden={!onOff} w="25px" h="25px" ml="8px">
        <MdSubtitles size="25px" />
      </Box>
      <RequestButton />
    </Flex>
  );
}
