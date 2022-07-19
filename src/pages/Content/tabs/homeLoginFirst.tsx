import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Button, Link, Stack, Text } from '@chakra-ui/react';
import { LoginFirstIcon } from '../components/icons';
import createTab from '../utils/createTab';

export default function HomeLoginFirst() {
  const t = chrome.i18n.getMessage;

  return (
    <Stack p="10px 20px 10px 20px" alignItems="center">
      <LoginFirstIcon size={300} />
      <Text fontWeight="bold" fontSize="22px" mt="-20px !important">
        {t('HomeLoginFirst_title')}
      </Text>
      <Text fontSize="18px">{t('HomeLoginFirst_message')}</Text>
      <Button
        colorScheme="blue"
        variant="solid"
        w="170px"
        h="40px"
        mt="40px !important"
        onClick={() => {
          createTab(
            `${API_URL}/auth/signin?callbackUrl=${window.location.href}`
          );
        }}
      >
        <Text fontSize="18px">{t('HomeLoginFirst_loginBtn')}</Text>
      </Button>
      <Link
        href={API_URL}
        color="gray.400"
        fontSize="15px"
        mt="10px !important"
      >
        {t('HomeLoginFirst_webpageUrl')}
        <ExternalLinkIcon mx="2px" />
      </Link>
    </Stack>
  );
}
