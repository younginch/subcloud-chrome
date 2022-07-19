import { EditIcon } from '@chakra-ui/icons';
import { Box, Button, Text } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import { FaFileUpload } from 'react-icons/fa';
import DropZone from '../../components/dropZone';
import getYoutubeId from '../../helpers/getYoutube';
import createTab from '../../utils/createTab';
import getTab from '../../utils/getTab';

export type Props = {
  setFiles: Dispatch<SetStateAction<File[] | undefined>>;
  uploadCallback: () => void;
};

export default function UploadSubtitle({ setFiles, uploadCallback }: Props) {
  const t = chrome.i18n.getMessage;

  return (
    <>
      <Text fontWeight="bold" fontSize="22px" m="10px">
        {t('UploadSubtitle_title')}
      </Text>
      <Box w="600px" h="320px" mt="10px !important">
        <DropZone setFiles={setFiles} uploadCallback={uploadCallback}>
          <FaFileUpload size={100} />
          <Text fontWeight="bold" fontSize="18px" mt="20px !important">
            {t('UploadSubtitle_dropZone_top')}
          </Text>
          <Text fontSize="15px" mt="4px !important">
            {t('UploadSubtitle_dropZone_bottom')}
          </Text>
        </DropZone>
      </Box>
      <Button
        leftIcon={<EditIcon w="14px" h="14px" />}
        colorScheme="teal"
        variant="solid"
        w="150px"
        h="35px"
        mt="10px !important"
        onClick={async () => {
          const tab = await getTab();
          const videoId = getYoutubeId(new URL(tab.url));
          await createTab(`${API_URL}/editor?youtubeId=${videoId}`);
        }}
      >
        <Text fontSize="14px">Edit on SubCloud</Text>
      </Button>
    </>
  );
}
