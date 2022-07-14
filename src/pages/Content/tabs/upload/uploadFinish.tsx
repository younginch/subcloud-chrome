import { HStack, Text, Link } from '@chakra-ui/react';
import { AppreciationIcon } from '../../components/icons';

export default function UploadFinish() {
  const t = chrome.i18n.getMessage;
  return (
    <>
      <Text fontWeight="bold" fontSize="22px" m="10px">
        {t('UploadFinish_title')}
      </Text>
      <HStack fontWeight="bold" fontSize="18px" m="10px !important">
        <Text>{t('UploadFinish_status_first')}</Text>
        <Link href={API_URL} color="#8888ff">
          {t('UploadFinish_status_middle')}
        </Link>
        <Text>{t('UploadFinish_status_end')}</Text>
      </HStack>
      <AppreciationIcon size={300} />
      <Text fontWeight="bold" fontSize="20px" mt="-10px !important">
        {t('UploadFinish_thanks')}
      </Text>
    </>
  );
}
