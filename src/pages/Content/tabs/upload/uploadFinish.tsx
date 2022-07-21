import { HStack, Text } from '@chakra-ui/react';
import { AppreciationIcon } from '../../components/icons';
import createTab from '../../utils/createTab';

export default function UploadFinish() {
  const t = chrome.i18n.getMessage;
  return (
    <>
      <Text fontWeight="bold" fontSize="22px" m="10px">
        {t('UploadFinish_title')}
      </Text>
      <HStack fontWeight="bold" fontSize="18px" m="10px !important">
        <Text>{t('UploadFinish_status_first')}</Text>
        <Text
          color="#8888ff"
          onClick={() => {
            createTab(`${API_URL}/user/my/sub`);
          }}
          _hover={{
            textDecoration: 'underline',
          }}
        >
          {t('UploadFinish_status_middle')}
        </Text>
        <Text>{t('UploadFinish_status_end')}</Text>
      </HStack>
      <AppreciationIcon size={300} />
      <Text fontWeight="bold" fontSize="20px" mt="-10px !important">
        {t('UploadFinish_thanks')}
      </Text>
    </>
  );
}
