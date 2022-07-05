import { Box, Flex, Switch, Text, Tooltip } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { toggleMainModal } from '../helpers/modalControl';
import { SubcloudIcon } from './icons';

export default function BottomButton() {
  const [onOff, setOnOff] = useState<boolean>(false);
  const [notifyCount, setNotifyCount] = useState<number>(0);
  const [hasSub, setHasSub] = useState<boolean>(true);
  const [preferLang, setPreferLang] = useState<string>('한국어');

  useEffect(() => {
    chrome.storage.local.get(['onOff'], (result) => {
      if (result.onOff !== undefined) setOnOff(result.onOff);
    });
  }, []);

  useEffect(() => {
    chrome.storage.local.set({ onOff });
  }, [onOff]);

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
        bg="rgba(0,0,0,0.5)"
        color="white"
        fontSize="14px"
        openDelay={100}
        mb="18px"
        ml="6px"
      >
        <Box
          hidden={!onOff}
          w="30px"
          h="30px"
          ml="8px"
          p="0px !important"
          position="relative"
          cursor="pointer"
          title="subcloud"
          onClick={() => toggleMainModal()}
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
    </Flex>
  );
}
