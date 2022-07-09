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
import { useEffect, useState } from 'react';
import { BsMoonStarsFill, BsSun } from 'react-icons/bs';
import { User } from '../../../utils/type';
import { getFetch } from '../Content/utils/fetch';
import toast, { ToastType } from '../Content/utils/toast';
import LoginFirst from './components/loginFirst';

export default function Popup() {
  const { colorMode, toggleColorMode } = useColorMode();
  const linkColor = useColorModeValue('blue', 'blue.400');
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState<User | undefined>();

  async function getUserInfo() {
    try {
      const data = await getFetch('auth/session');
      if (data && data.user) {
        setUser({
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          image: data.user.image,
          point: data.user.point,
        });
        setIsLogin(true);
      }
    } catch (error: unknown) {
      if (error instanceof Error) toast(ToastType.ERROR, error.message);
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

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
      {isLogin ? (
        <>
          <HStack fontSize="15px">
            <Text>로그인 상태:</Text>
            <Text>{user?.name}</Text>
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
            <Text>{user?.point}</Text>
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
            <Button
              colorScheme="blue"
              p="10px"
              fontSize="14px"
              h="fit-content"
              onClick={() =>
                chrome.tabs.create({ url: `${API_URL}/user/${user?.id}` })
              }
            >
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
