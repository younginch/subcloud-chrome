import { ChevronDownIcon } from '@chakra-ui/icons';
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
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorModeValue,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import ISO6391, { LanguageCode } from 'iso-639-1';
import { CgShapeTriangle } from 'react-icons/cg';
import { TbDiamond, TbDiamonds } from 'react-icons/tb';
import { BiRocket } from 'react-icons/bi';
import { BsLightningCharge } from 'react-icons/bs';
import { HiOutlineFire } from 'react-icons/hi';

type PointElement = {
  amount: number;
  hoverColor: string;
  icon: React.ReactElement;
};

export default function HomeNoSub() {
  const codeList: LanguageCode[] = [
    'en',
    'fr',
    'de',
    'it',
    'es',
    'pt',
    'ru',
    'ja',
    'zh',
    'ko',
  ];

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

  return (
    <Stack p="10px 20px 10px 20px">
      <Text fontWeight="bold" fontSize="22px" mt="10px" mb="10px">
        자막이 없습니다. 무료로 요청해 보세요.
      </Text>
      <HStack>
        <Image
          w="200px"
          h="112px"
          src="https://i.ytimg.com/vi/i7muqI90138/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBC5w6YC_g_y_C63HEmGQKFLdFM3Q/"
        />
        <Stack pl="15px" spacing="10px">
          <Text fontWeight="bold" fontSize="20px">
            창모 (CHANGMO) - 널 지워야해 (Erase You)...
          </Text>
          <HStack>
            <Avatar
              marginEnd="12px"
              src="https://yt3.ggpht.com/OnmZuPdpbqdTg01LBgTi1TGC7MSqD2Ux6H2uyEuwwgaRYfi1qvbSTP634RUfgK9ScQ7og60C=s48-c-k-c0x00ffffff-no-rj"
            />
            <Stack>
              <Heading size="md">리릭뭉치</Heading>
              <Heading size="md" fontWeight="normal">
                구독자 72010명
              </Heading>
            </Stack>
          </HStack>
        </Stack>
      </HStack>
      <HStack justifyContent="space-around">
        <Stack
          w="250px"
          h="200px"
          bg="#232C39"
          borderRadius="20px"
          p="10px"
          mt="20px"
        >
          <Text fontWeight="bold" fontSize="19px">
            요청할 언어 선택
          </Text>
          <Center mt="35px !important">
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                fontSize="15px"
                w="180px"
                h="40px"
                borderRadius="10px"
                boxShadow="rgba(144,205,244, 0.4) 0px 10px 36px 0px, rgba(144,205,244, 0.4) 0px 0px 0px 1px;"
              >
                언어 선택
              </MenuButton>
              <MenuList maxH="450px" overflow="scroll" w="180px">
                {codeList.map((code) => (
                  <MenuItem key={code} w="180px" fontSize="13px">
                    {`${ISO6391.getName(code)} (${ISO6391.getNativeName(
                      code
                    )})`}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Center>
          <Box className="default-language" mt="30px !important">
            <Checkbox mt={5} defaultChecked>
              기본 요청 언어로 저장
            </Checkbox>
          </Box>
        </Stack>
        <Stack
          w="300px"
          h="200px"
          bg="#232C39"
          borderRadius="20px"
          p="10px"
          mt="20px !important"
        >
          <Text fontWeight="bold" fontSize="19px">
            포인트
          </Text>
          <Wrap justify="space-evenly">
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
      <Center>
        <Button
          colorScheme="blue"
          borderRadius="10px"
          mt="30px !important"
          w="400px"
          h="45px"
          fontSize="20px"
        >
          {100}P를 사용하여 한국어 자막 요청하기
        </Button>
      </Center>
      <Center>
        <Text>현재까지 10명이 자막을 요청했어요</Text>
      </Center>
    </Stack>
  );
}
