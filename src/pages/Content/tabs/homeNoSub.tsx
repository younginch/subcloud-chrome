import {
  Avatar,
  Box,
  Button,
  Center,
  Checkbox,
  Heading,
  HStack,
  Image,
  keyframes,
  NumberInput,
  NumberInputField,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
  useColorModeValue,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { CgShapeTriangle } from 'react-icons/cg';
import { TbDiamond, TbDiamonds } from 'react-icons/tb';
import { BiRocket } from 'react-icons/bi';
import { BsLightningCharge } from 'react-icons/bs';
import { HiOutlineFire } from 'react-icons/hi';
import { ChangeEvent, useEffect, useState } from 'react';
import getTab from '../utils/getTab';
import request from '../utils/api/request';
import requestCount from '../utils/api/requestCount';
import video from '../utils/api/video';
import toast, { ToastType } from '../utils/toast';
import SelectLang from '../components/selectLang';

type PointElement = {
  amount: number;
  hoverColor: string;
  icon: React.ReactElement;
};

type YoutubeVideoInfo = {
  thumbnailUrl: string;
  title: string;
  channel: {
    title: string;
    subscriberCount: number;
    thumbnailUrl: string;
  };
};

export default function HomeNoSub() {
  const points: Array<PointElement> = [
    {
      amount: 10,
      hoverColor: useColorModeValue('#C0F3F8', '#19BFD1'),
      icon: <CgShapeTriangle size="100%" />,
    },
    {
      amount: 50,
      hoverColor: useColorModeValue('green.200', 'green.800'),
      icon: <TbDiamonds size="100%" />,
    },
    {
      amount: 100,
      hoverColor: useColorModeValue('blue.200', 'blue.800'),
      icon: <TbDiamond size="100%" />,
    },
    {
      amount: 500,
      hoverColor: useColorModeValue('#F4B183', '#B74B09'),
      icon: <HiOutlineFire size="100%" />,
    },
    {
      amount: 1000,
      hoverColor: useColorModeValue('#D8BEEC', '#7330A6'),
      icon: <BiRocket size="100%" />,
    },
    {
      amount: 5000,
      hoverColor: useColorModeValue('#FFE699', '#A29A00'),
      icon: <BsLightningCharge size="100%" strokeWidth="0.2px" />,
    },
  ];
  const pointHoverAnimation = keyframes`
  0% {
    border-radius: 20%;
  }
  10% {
    border-radius: 45%;
  }
  40% {
    border-radius: 48%;
  }
  100% {
    border-radius: 50%;
  }
  `;
  const pointBg = useColorModeValue('gray.100', 'gray.800');
  const [youtubeVideoInfo, setYoutubeVideoInfo] = useState<
    YoutubeVideoInfo | undefined
  >();
  const [isLoaded, setIsLoaded] = useState(false);
  const [count, setCount] = useState<number | undefined>();
  const [point, setPoint] = useState<number>(0);

  const sendRequest = async () => {
    try {
      const tab = await getTab();
      await request(tab.url, 'en', point);
      const cnt = await requestCount(tab.url);
      setCount(cnt);
      await toast(ToastType.SUCCESS, 'request sent');
    } catch (error: unknown) {
      if (error instanceof Error) toast(ToastType.ERROR, error.message);
    }
  };

  const getVideoInfo = async () => {
    try {
      const tab = await getTab();
      const videoInfo = await video(tab.url);
      const { youtubeVideo } = videoInfo;
      let replaceUrl = tab.url.replace('https://youtu.be/', '');
      replaceUrl = replaceUrl.replace('https://www.youtube.com/embed/', '');
      replaceUrl = replaceUrl.replace('https://www.youtube.com/watch?v=', '');
      const finUrl = replaceUrl.split('&')[0];
      setYoutubeVideoInfo({
        thumbnailUrl: `http://img.youtube.com/vi/${finUrl}/0.jpg`,
        title: youtubeVideo?.title ?? '',
        channel: {
          title: youtubeVideo?.channel.title ?? '',
          subscriberCount: youtubeVideo?.channel.subscriberCount ?? 0,
          thumbnailUrl: youtubeVideo?.channel.thumbnailUrl ?? '',
        },
      });
      setIsLoaded(true);
    } catch (error: unknown) {
      if (error instanceof Error) toast(ToastType.ERROR, error.message);
    }
  };

  const getRequestCount = async () => {
    try {
      const tab = await getTab();
      const cnt = await requestCount(tab.url);
      setCount(cnt);
    } catch (error: unknown) {
      if (error instanceof Error) toast(ToastType.ERROR, error.message);
    }
  };

  useEffect(() => {
    const init = async () => {
      await getVideoInfo();
      await getRequestCount();
    };
    init();
  }, []);

  return (
    <Stack p="10px 20px 10px 20px">
      <Skeleton isLoaded={isLoaded} h="30px" mt="10px" mb="10px" w="620px">
        <Text fontWeight="bold" fontSize="22px">
          영상에 자막이 없습니다. 무료로 요청해 보세요.
        </Text>
      </Skeleton>
      <HStack>
        <Skeleton isLoaded={isLoaded}>
          <Image w="200px" h="147px" src={youtubeVideoInfo?.thumbnailUrl} />
        </Skeleton>
        <Stack pl="15px" spacing="10px">
          <Skeleton isLoaded={isLoaded}>
            <Text
              fontWeight="bold"
              fontSize="20px"
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace="nowrap"
              w="420px"
              h="27px"
              color="gray.100"
            >
              {youtubeVideoInfo?.title}
            </Text>
          </Skeleton>
          <HStack>
            <SkeletonCircle isLoaded={isLoaded} size="45px">
              <Avatar
                marginEnd="12px"
                src={youtubeVideoInfo?.channel.thumbnailUrl}
                w="45px"
                h="45px"
              />
            </SkeletonCircle>
            <Stack>
              <Skeleton isLoaded={isLoaded}>
                <Heading fontSize="15px" h="18px" w="250px" color="gray.300">
                  {youtubeVideoInfo?.channel.title}
                </Heading>
              </Skeleton>
              <Skeleton isLoaded={isLoaded}>
                <Heading
                  fontSize="15px"
                  h="18px"
                  w="250px"
                  fontWeight="normal"
                  color="gray.300"
                >
                  구독자 {youtubeVideoInfo?.channel.subscriberCount}명
                </Heading>
              </Skeleton>
            </Stack>
          </HStack>
        </Stack>
      </HStack>
      <HStack
        justifyContent="space-around"
        mt="10px !important"
        alignItems="center"
      >
        <Stack
          w="250px"
          h="180px"
          bg="bgColor.300"
          borderRadius="20px"
          p="10px 10px 10px 20px"
        >
          <Text fontWeight="bold" fontSize="19px">
            요청할 언어 선택
          </Text>
          <Center mt="20px !important">
            <SelectLang
              width="180px"
              height="40px"
              mainFont="15px"
              subFont="13px"
              clickEvent={() => null}
            />
          </Center>
          <Box className="default-language" mt="20px !important">
            <Checkbox mt={5} defaultChecked>
              기본 요청 언어로 저장
            </Checkbox>
          </Box>
        </Stack>
        <Stack
          w="300px"
          h="210px"
          bg="bgColor.300"
          borderRadius="20px"
          p="10px 20px 10px 20px"
          alignItems="center"
          justifyContent="space-around"
        >
          <HStack justifyContent="space-between" w="250px">
            <Text fontWeight="bold" fontSize="19px">
              포인트
            </Text>
            <NumberInput
              defaultValue={0}
              min={0}
              max={20}
              keepWithinRange={false}
              clampValueOnBlur={false}
              w="120px"
            >
              <NumberInputField
                border="none !important"
                bg="bgColor.800 !important"
                fontSize="15px"
                textAlign="end"
                pr="15px"
                value={point}
                onChange={(value: ChangeEvent<HTMLInputElement>) =>
                  setPoint(Number(value.target.value))
                }
              />
            </NumberInput>
          </HStack>
          <Wrap justify="space-evenly" w="280px">
            {points.map((element) => (
              <WrapItem key={element.amount} zIndex={10}>
                <Box
                  as={Stack}
                  justifyContent="center"
                  alignItems="center"
                  w="70px"
                  h="70px"
                  borderRadius="20%"
                  bg={pointBg}
                  _hover={{
                    bg: element.hoverColor,
                    animation: `1s ${pointHoverAnimation}`,
                    borderRadius: '50%',
                  }}
                >
                  <Box w="35%" h="35%">
                    {element.icon}
                  </Box>
                  <Text fontWeight="bold" fontSize="14px">
                    {element.amount}P
                  </Text>
                </Box>
              </WrapItem>
            ))}
          </Wrap>
        </Stack>
      </HStack>
      <Stack alignItems="center">
        <Button
          colorScheme="blue"
          borderRadius="10px"
          mt="25px !important"
          width="fit-content"
          pl="10px"
          pr="10px"
          h="45px"
          fontSize="20px"
          onClick={sendRequest}
        >
          {point === 0 ? '무료로 ' : `${point}포인트를 사용하여 `} 한국어 자막
          요청하기
        </Button>
        {count && (
          <Text fontSize="15px">{count}명이 자막을 기다리고 있어요</Text>
        )}
      </Stack>
    </Stack>
  );
}
