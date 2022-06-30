import { Box, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { FaFileUpload } from 'react-icons/fa';
import DropZone from '../components/DropZone';

export default function Upload() {
  const [files, setFiles] = useState<File[]>();
  return (
    <Stack p="10px 20px 10px 20px" alignItems="center">
      <Text fontWeight="bold" fontSize="22px" m="10px">
        응애 자막 업로드 &quot;해줘&quot;
      </Text>
      <Text fontSize="15px">SRT파일 포맷만 지원합니다.</Text>
      <Box w="500px" h="300px" mt="30px">
        <DropZone setFiles={setFiles}>
          <FaFileUpload size={100} />
          <Text fontWeight="bold" fontSize="18px" mt="20px !important">
            드래그 앤 드랍 또는
          </Text>
          <Text fontWeight="bold" fontSize="18px" mt="8px !important">
            클릭하여 업로드
          </Text>
        </DropZone>
      </Box>
    </Stack>
  );
}
