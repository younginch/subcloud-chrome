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

export default function LoginFirst() {
  const t = chrome.i18n.getMessage;
  const { colorMode, toggleColorMode } = useColorMode();
  const linkColor = useColorModeValue('blue', 'blue.400');
  return (
    <>
      <Text fontSize="17px" mt="35 !important">
        {t('LoginFirst_message')}
      </Text>
      <Button
        colorScheme="blue"
        onClick={() =>
          chrome.tabs.create({ url: `${API_URL}/api/auth/signin` })
        }
      >
        {t('LoginFirst_loginBtn')}
      </Button>
      <Text
        as={Link}
        fontSize="14px"
        color={linkColor}
        onClick={() => chrome.tabs.create({ url: API_URL })}
        mt="35 !important"
      >
        {t('LoginFirst_visitWebpage')}
      </Text>
    </>
  );
}
