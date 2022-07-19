import { Button, Heading, HStack, Stack, useColorMode } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BsMoonStarsFill, BsSun } from 'react-icons/bs';
import { User } from '../../../utils/type';
import { getFetch } from '../Content/utils/fetch';
import toast, { ToastType } from '../Content/utils/toast';
import LoginFirst from './components/loginFirst';
import LoginStatus from './components/loginStatus';

export default function Popup() {
  const { colorMode, toggleColorMode } = useColorMode();
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
      {isLogin ? <LoginStatus user={user} /> : <LoginFirst />}
    </Stack>
  );
}
