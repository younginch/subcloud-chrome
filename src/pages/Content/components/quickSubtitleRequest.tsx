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
import { useEffect, useState } from 'react';
import SelectLang from './selectLang';

export default function QuickSubtitleRequest() {
  const [defaultRequestLang, setDefaultRequestLang] = useState<string>();

  useEffect(() => {
    // TODO: set Preferlang from api
    if (Math.random() < 0.1) setDefaultRequestLang('Kr');
  }, []);

  return (
    <Stack>
      {defaultRequestLang ? (
        <Button colorScheme="blue" variant="outline" fontSize="14px" h="30px">
          Request Subtitle
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
              Request Subtitle
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
                  clickEvent={() => null}
                  marginTop="10px !important"
                  lang={undefined}
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
              <Button colorScheme="blue" fontSize="15px" w="100px" h="30px">
                요청 전송
              </Button>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      )}
      <Text
        fontSize="12px"
        color={useColorModeValue('gray.700', 'gray.400')}
        mt="0px !important"
        textAlign="center"
      >
        Powered by SubCloud
      </Text>
    </Stack>
  );
}
