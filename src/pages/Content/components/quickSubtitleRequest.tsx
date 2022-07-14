import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Text,
  Box,
  Checkbox,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import ISO6391 from 'iso-639-1';
import { useEffect, useState } from 'react';
import { APIError, Warning } from '../../../../utils/error';
import getLang from '../utils/api/getLang';
import request from '../utils/api/request';
import video from '../utils/api/video';
import getTab from '../utils/getTab';
import toast, { ToastType } from '../utils/toast';
import SelectLang from './selectLang';

export default function QuickSubtitleRequest() {
  const [requestLang, setRequestLang] = useState<string>();
  const [lang, setLang] = useState<string | undefined>();
  const [isQuickRequest, setIsQuickRequest] = useState<boolean>(false);
  const t = chrome.i18n.getMessage;

  const sendRequest = async () => {
    try {
      if (!lang) throw new Warning('Language not selected');
      const tab = await getTab();
      const videoData = await video(tab.url);
      await request(videoData.serviceId, videoData.videoId, lang, 0);
      await toast(
        ToastType.SUCCESS,
        `Request sent in ${ISO6391.getNativeName(lang)}`
      );
    } catch (error: unknown) {
      if (error instanceof APIError) toast(ToastType.ERROR, 'Server error');
      else if (lang && error instanceof Warning)
        toast(
          ToastType.WARNING,
          `Request already sent in ${ISO6391.getNativeName(lang)}`
        );
      else if (!lang && error instanceof Warning)
        toast(ToastType.WARNING, error.message);
      else if (error instanceof Error) toast(ToastType.ERROR, error.message);
    }
  };

  useEffect(() => {
    const init = async () => {
      const getLangs = async () => {
        const { requestLangs } = await getLang();
        if (requestLangs && requestLangs.length > 0) {
          setRequestLang(requestLangs[0]);
          setLang(requestLangs[0]);
        }
      };
      try {
        await getLangs();
        chrome.storage.local.get(['isQuickRequest'], (result) => {
          if (result.isQuickRequest) setIsQuickRequest(result.isQuickRequest);
        });
      } catch (error: unknown) {
        if (error instanceof Error) console.log('Server error');
      }
    };
    init();
  }, []);

  return isQuickRequest ? (
    <Stack>
      {requestLang ? (
        <Button
          colorScheme="blue"
          variant="outline"
          fontSize="14px"
          h="30px"
          onClick={sendRequest}
        >
          {t('QuickSubtitleRequest_requestMsg')}
        </Button>
      ) : (
        <Popover placement="bottom">
          <PopoverTrigger>
            <Button
              colorScheme="blue"
              variant="outline"
              fontSize="14px"
              h="30px"
            >
              {t('QuickSubtitleRequest_requestMsg')}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            color="white"
            bg="blue.800"
            borderColor="blue.800"
            w="300px"
            h="205px"
          >
            <PopoverHeader pt={4} fontWeight="bold" border="0" fontSize="17px">
              무료 자막 요청
            </PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              <Stack alignItems="center">
                <Text fontSize="16px">자막을 요청할 언어를 선택하세요.</Text>
                <SelectLang
                  width="140px"
                  height="30px"
                  mainFont="13px"
                  subFont="11px"
                  clickEvent={setLang}
                  marginTop="10px !important"
                  lang={lang}
                />
                <Text fontSize="14px" color="gray.300">
                  기본 요청 언어를 선택하면 앞으로 클릭 한번으로 요청할 수
                  있습니다.
                </Text>
              </Stack>
            </PopoverBody>
            <PopoverFooter
              border="0"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              pb={4}
              mt="4px !important"
            >
              <Box className="default-language-small">
                <Checkbox defaultChecked>기본 요청 언어로 저장</Checkbox>
              </Box>
              <Button
                colorScheme="blue"
                fontSize="15px"
                w="100px"
                h="30px"
                onClick={sendRequest}
              >
                요청 전송
              </Button>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      )}
      <Text
        fontSize="12px"
        // eslint-disable-next-line react-hooks/rules-of-hooks
        color={useColorModeValue('gray.700', 'gray.400')}
        mt="0px !important"
        textAlign="center"
      >
        Powered by SubCloud
      </Text>
    </Stack>
  ) : (
    <> </>
  );
}
