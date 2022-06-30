import { Box, Text } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import { FaFileUpload } from 'react-icons/fa';
import DropZone from '../../components/DropZone';

export type Props = {
  setFiles: Dispatch<SetStateAction<File[] | undefined>>;
  uploadCallback: () => void;
};

export default function UploadSubtitle({ setFiles, uploadCallback }: Props) {
  return (
    <>
      <Text fontWeight="bold" fontSize="22px" m="10px">
        컴퓨터에서 자막 파일 선택
      </Text>
      <Text fontSize="15px">SRT파일 포맷만 지원합니다.</Text>
      <Box w="600px" h="330px" mt="10px !important">
        <DropZone setFiles={setFiles} uploadCallback={uploadCallback}>
          <FaFileUpload size={100} />
          <Text fontWeight="bold" fontSize="18px" mt="20px !important">
            드래그 앤 드랍 또는
          </Text>
          <Text fontWeight="bold" fontSize="18px" mt="8px !important">
            클릭하여 업로드
          </Text>
        </DropZone>
      </Box>
    </>
  );
}
