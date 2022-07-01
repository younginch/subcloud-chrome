import { ViewIcon } from '@chakra-ui/icons';
import { Box, Button, HStack, Spacer, Text } from '@chakra-ui/react';
import { IoMdCloudUpload } from 'react-icons/io';
import { SRTFile } from '@younginch/subtitle';
import { useState } from 'react';
import toast from '../../utils/toast';
import getTab from '../../utils/getTab';
import uploadFile from '../../utils/api/uploadFile';

export type Props = {
  files: File[] | undefined;
  sendCallback: () => void;
};

export default function CheckSubtitle({ files, sendCallback }: Props) {
  const [sub, setSub] = useState<SRTFile | undefined>();

  const preview = async () => {
    try {
      if (!files) return;
      const reader = new FileReader();
      reader.readAsText(files[0]);
      reader.onload = () => {
        setSub(SRTFile.fromText(String(reader.result)));
        chrome.storage.local.set({ subtitle: JSON.stringify(sub) });
      };
    } catch (error: unknown) {
      if (error instanceof Error) toast(error.message);
    }
  };

  const upload = async () => {
    try {
      if (!files) return;
      const tab = await getTab();
      const reader = new FileReader();
      reader.readAsText(files[0]);
      reader.onload = () => {
        uploadFile(String(reader.result), files[0].name, tab.url, 'en');
      };
    } catch (error: unknown) {
      if (error instanceof Error) toast(error.message);
    }
  };

  return (
    <>
      <Text fontWeight="bold" fontSize="22px" m="10px">
        자막을 검토하고 업로드하세요
      </Text>
      <HStack w="550px" mt="15px !important">
        <Text fontSize="13px">파일 미리보기 (총 {sub?.array.length}줄)</Text>
        <Spacer />
        <Button colorScheme="red" fontSize="12px">
          다시 업로드
        </Button>
      </HStack>
      <Box
        w="550px"
        h="250px"
        mt="5px"
        bg="#232C39"
        borderRadius="5px"
        borderWidth="1px"
        borderColor="gray.500"
        overflow="auto"
      >
        {sub
          ?.toText()
          .split('\n')
          .map((line, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Text fontSize="14px" key={index}>
              {line}
            </Text>
          ))}
      </Box>
      <HStack mt="20px !important" spacing="120px">
        <Button
          leftIcon={<ViewIcon w="20px" h="20px" />}
          h="45px"
          w="130px"
          colorScheme="blue"
          onClick={preview}
        >
          <Text fontSize="18px">프리뷰</Text>
        </Button>
        <Button
          leftIcon={<IoMdCloudUpload size="20px" />}
          onClick={() => {
            upload();
            sendCallback();
          }}
          h="45px"
          w="130px"
          colorScheme="green"
        >
          <Text fontSize="18px">전송</Text>
        </Button>
      </HStack>
    </>
  );
}
