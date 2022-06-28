import { Box, CircularProgress, ScaleFade } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { AiFillSetting } from 'react-icons/ai';
import { HiOutlineUpload } from 'react-icons/hi';
import { SubcloudIcon } from '../../../assets/commonComponents/Icons';

export default function RequestButton() {
  const [onHover, setOnHover] = useState<boolean>(false);
  const [gauge, setGauge] = useState<number>(0);
  const [popover, setPopover] = useState<boolean>(false);
  const [inPopover, setInPopover] = useState<boolean>(false);

  const mouseLeave = () => {
    console.log('exit!!');
    setOnHover(false);
    setGauge(0);
  };

  const mouseEnter = () => {
    console.log('hello!!');
    setOnHover(true);
    setTimeout(() => {
      setGauge(100);
    }, 100);
    setTimeout(() => {
      setPopover(true);
    }, 750);
  };

  const enterPopover = () => {
    setInPopover(true);
  };

  const exitPopover = () => {
    setInPopover(false);
    setGauge(0);
  };

  return (
    <Box position="relative" w="25px" h="25px" ml="4px">
      <CircularProgress
        value={gauge}
        size="140%"
        color="red.200"
        position="absolute"
        thickness="5px"
        mt="-6px"
        hidden={!onHover}
      />
      <Box
        position="absolute"
        w="20px"
        h="20px"
        mt="2px"
        ml="7px"
        onMouseLeave={mouseLeave}
        onMouseEnter={mouseEnter}
        zIndex="51"
      >
        <FiSend size="20px" />
      </Box>
      <Box
        position="absolute"
        w="90px"
        h="90px"
        borderRadius="50%"
        mt="-62px"
        ml="-27px"
        zIndex="49"
        bg="rgba(50,50,50,.3)"
        hidden={(!onHover || !popover) && !inPopover}
        onMouseEnter={enterPopover}
        onMouseLeave={exitPopover}
      >
        <Box
          position="absolute"
          w="26px"
          h="26px"
          mt="30px"
          ml="0px"
          zIndex="50"
          _hover={{
            color: 'red.400',
          }}
        >
          <ScaleFade initialScale={1} whileHover={{ scale: 1.1 }} in>
            <HiOutlineUpload size="100%" />
          </ScaleFade>
        </Box>
        <Box
          position="absolute"
          w="26px"
          h="26px"
          mt="-10px"
          ml="32px"
          zIndex="50"
          _hover={{
            fill: 'red.400',
          }}
          fill="white"
        >
          <ScaleFade initialScale={1} whileHover={{ scale: 1.1 }} in>
            <SubcloudIcon size="100%" fill="inherit" />
          </ScaleFade>
        </Box>
        <Box
          position="absolute"
          w="26px"
          h="26px"
          mt="30px"
          ml="60px"
          zIndex="50"
          _hover={{
            color: 'red.400',
          }}
        >
          <ScaleFade initialScale={1} whileHover={{ scale: 1.1 }} in>
            <AiFillSetting size="100%" />
          </ScaleFade>
        </Box>
      </Box>
    </Box>
  );
}
