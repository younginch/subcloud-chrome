import { Box, Flex, Text, Tooltip } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Switch from 'react-switch';
import { toggleMainModal } from '../helpers/modalControl';
import getLang from '../utils/api/getLang';
import getSubs from '../utils/api/getSubs';
import { getNotices } from '../utils/api/notice';
import video from '../utils/api/video';
import getTab from '../utils/getTab';
import { SubcloudIcon } from './icons';

export default function BottomButton() {
  const [onOff, setOnOff] = useState<boolean>(false);
  const [notifyCount, setNotifyCount] = useState<number>(0);
  const [hasSub, setHasSub] = useState<boolean>(false);
  const [baseLang, setBaseLang] = useState<string>('한국어');

  useEffect(() => {
    const getNoticeCount = async () => {
      const notices = await getNotices();
      setNotifyCount(notices.filter((notice: any) => !notice.checked).length);
    };

    const getLangs = async () => {
      const { baseLangs } = await getLang();
      if (baseLangs && baseLangs.length > 0) setBaseLang(baseLangs[0]);
    };

    const getHasSub = async () => {
      const tab = await getTab();
      const videoData = await video(tab.url);
      const subs = await getSubs(videoData?.videoId, videoData?.serviceId);
      setHasSub(
        subs.reduce(
          (prev: boolean, curr) => prev || curr.lang === baseLang,
          false
        )
      );
    };

    const init = async () => {
      try {
        await getNoticeCount();
        await getLangs();
        await getHasSub();
        chrome.storage.local.get(['onOff'], (result) => {
          if (result.onOff !== undefined) setOnOff(result.onOff);
        });
      } catch (error: unknown) {
        if (error instanceof Error) console.log('server error');
      }
    };
    init();
  }, [baseLang]);

  useEffect(() => {
    chrome.storage.local.set({ onOff });
  }, [onOff]);

  return (
    <Flex flexDir="row" alignItems="center !important" h="100%" ml="-8px">
      <Tooltip
        label={<span>Subcloud 자막 On/Off</span>}
        placement="top"
        bg="rgba(0,0,0,0.5)"
        color="white"
        fontSize="14px"
        mb="18px"
        ml="6px"
      >
        <Box mt="3px">
          <Switch
            checked={onOff}
            onChange={() => setOnOff(!onOff)}
            onColor="#86d3ff"
            handleDiameter={32}
            uncheckedIcon={false}
            checkedIcon={false}
            height={13}
            width={33}
            checkedHandleIcon={<SubcloudIcon size="32px" fill="white" />}
            uncheckedHandleIcon={<SubcloudIcon size="32px" fill="white" />}
          />
        </Box>
      </Tooltip>

      <Tooltip
        label={
          <>
            <span>
              <b>SubCloud</b>
            </span>
            {hasSub && (
              <>
                <br />
                <span>영상에 {baseLang} 자막이 있습니다</span>
              </>
            )}
          </>
        }
        placement="top"
        bg="rgba(0,0,0,0.5)"
        color="white"
        fontSize="14px"
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
          {(hasSub || notifyCount > 0) && (
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
