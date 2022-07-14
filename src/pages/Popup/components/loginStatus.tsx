import {
  HStack,
  Button,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import { User } from '../../../../utils/type';

type Props = {
  user: User | undefined;
};

export default function LoginStatus({ user }: Props) {
  const t = chrome.i18n.getMessage;
  const linkColor = useColorModeValue('blue', 'blue.400');
  return (
    <>
      <HStack fontSize="15px">
        <Text>{t('LoginStatus_loginStatus')}</Text>
        <Text>{user?.name}</Text>
        <Button
          fontSize="12px"
          h="fit-content"
          p="5px 10px 5px 10px"
          onClick={() =>
            chrome.tabs.create({ url: `${API_URL}/api/auth/signout` })
          }
        >
          {t('LoginStatus_logoutBtn')}
        </Button>
      </HStack>
      <HStack fontSize="15px">
        <Text>{t('LoginStatus_point')}</Text>
        <Text>{user?.point}</Text>
        <Button
          fontSize="12px"
          h="fit-content"
          p="5px 10px 5px 10px"
          onClick={() => chrome.tabs.create({ url: `${API_URL}/buy` })}
        >
          {t('LoginStatus_buyBtn')}
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
          {t('LoginStatus_publicProfile')}
        </Button>
        <Button
          colorScheme="red"
          p="10px"
          fontSize="14px"
          h="fit-content"
          onClick={() => chrome.tabs.create({ url: `${API_URL}/user/my` })}
        >
          {t('LoginStatus_privateProfile')}
        </Button>
      </HStack>
      <Text
        as={Link}
        fontSize="14px"
        color={linkColor}
        onClick={() => chrome.tabs.create({ url: API_URL })}
      >
        {t('LoginStatus_visitWebpage')}
      </Text>
    </>
  );
}
