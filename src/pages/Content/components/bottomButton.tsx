import {
  Box,
  Fade,
  Flex,
  Switch,
  useDisclosure,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Layout from '../layout';
import { SubcloudIcon } from './icons';

export default function BottomButton() {
  const [onOff, setOnOff] = useState<boolean>(false);
  const { isOpen, onToggle } = useDisclosure();
  const [notifyCount, setNotifyCount] = useState<number>(0);
  const [hasSub, setHasSub] = useState<boolean>(true);
  const [preferLang, setPreferLang] = useState<string>('한국어');

  useEffect(() => {
    chrome.storage.local.set({ onOff });
  }, [onOff]);

  useEffect(() => {
    chrome.storage.local.get(['onOff'], (result) => {
      if (result.onOff !== undefined) setOnOff(result.onOff);
    });
  }, []);

  return (
    <Flex flexDir="row" alignItems="center !important" h="100%">
      <Switch
        colorScheme="red"
        size="lg"
        checked={onOff}
        onChange={() => setOnOff(!onOff)}
      />
      <Tooltip
        label={
          <>
            <span>
              <b>SubCloud</b>
            </span>
            {hasSub && (
              <>
                <br />
                <span>영상에 {preferLang} 자막이 있습니다</span>
              </>
            )}
          </>
        }
        placement="top"
        bg="rgba(0,0,0,.5)"
        color="white"
        fontSize="14px"
        openDelay={100}
        mb="18px"
        ml="6px"
      >
        <Box
          onClick={onToggle}
          hidden={!onOff}
          w="30px"
          h="30px"
          ml="8px"
          p="0px !important"
          position="relative"
          cursor="pointer"
          title="subcloud"
        >
          <SubcloudIcon size="30px" fill="white" />
          {(hasSub || notifyCount) && (
            <Text
              bg="red"
              fontSize="12px"
              borderRadius="6px"
              position="absolute"
              pl="5px"
              pr="4px"
              ml={hasSub ? '16px' : '13px'}
              mt="-32px"
            >
              {hasSub ? '!' : notifyCount}
            </Text>
          )}
        </Box>
      </Tooltip>
      <Fade in={isOpen} hidden={!isOpen}>
        <Layout />
      </Fade>
    </Flex>
  );
}
