import {
  Button,
  Heading,
  HStack,
  Link,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { BsMoonStarsFill, BsSun } from 'react-icons/bs';
import LoginFirst from './components/loginFirst';

export default function Popup() {
  const { colorMode, toggleColorMode } = useColorMode();
  const linkColor = useColorModeValue('blue', 'blue.400');
  const login = true;

  return (
    <Stack alignItems="center" spacing="20px" p="15px">
      <HStack>
        <Heading>SubCloud</Heading>
        <Button
          aria-label="Toggle Color Mode"
          onClick={toggleColorMode}
          _focus={{ boxShadow: 'none' }}
          w="fit-content"
          bg="transparent"
        >
          {colorMode === 'light' ? <BsMoonStarsFill /> : <BsSun />}
        </Button>
      </HStack>
      {login ? (
        <>
          <HStack fontSize="15px">
            <Text>로그인 상태:</Text>
            <Text>갓띵건</Text>
            <Button
              fontSize="12px"
              h="fit-content"
              p="5px 10px 5px 10px"
              onClick={() =>
                chrome.tabs.create({ url: `${API_URL}/api/auth/signout` })
              }
            >
              로그아웃
            </Button>
          </HStack>
          <HStack fontSize="15px">
            <Text>보유 포인트:</Text>
            <Text>0</Text>
            <Button
              fontSize="12px"
              h="fit-content"
              p="5px 10px 5px 10px"
              onClick={() => chrome.tabs.create({ url: `${API_URL}/buy` })}
            >
              포인트 충전
            </Button>
          </HStack>
          <HStack>
            <Button colorScheme="blue" p="10px" fontSize="14px" h="fit-content">
              공개 프로필
            </Button>
            <Button
              colorScheme="red"
              p="10px"
              fontSize="14px"
              h="fit-content"
              onClick={() => chrome.tabs.create({ url: `${API_URL}/user/my` })}
            >
              개인 프로필
            </Button>
          </HStack>
          <Text
            as={Link}
            fontSize="14px"
            color={linkColor}
            onClick={() => chrome.tabs.create({ url: API_URL })}
          >
            웹페이지 방문
          </Text>
        </>
      ) : (
        <LoginFirst />
      )}
    </Stack>
  );
}
