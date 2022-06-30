import { Box, Button, Flex, Spacer, Text } from '@chakra-ui/react';
import { SRTFile } from '@younginch/subtitle';
import { useState } from 'react';
import uploadFile from '../utils/api/uploadFile';
import DropZone from '../components/DropZone';
import getTab from '../utils/getTab';

export default function UploadDeprecated() {
  const [files, setFiles] = useState<File[]>();
  const [lang, setLang] = useState('en');

  const preview = async () => {
    if (!files) return;
    const reader = new FileReader();
    reader.readAsText(files[0]);
    reader.onload = () => {
      const sub = SRTFile.fromText(String(reader.result));
      chrome.storage.local.set({ subtitle: JSON.stringify(sub) });
    };
  };

  const upload = async () => {
    if (!files) return;
    const tab = await getTab();
    const reader = new FileReader();
    reader.readAsText(files[0]);
    reader.onload = () => {
      uploadFile(String(reader.result), files[0].name, tab.url, lang);
    };
  };

  return (
    <Flex direction="column" p={0} w="100%" h="100%">
      {files !== undefined && (
        <Flex p="10px">
          <Flex>
            <Text color="#cccccc" fontSize="md">
              파일 이름:
            </Text>
            <Text color="#cccccc" fontSize="md">
              {files[0].name.replaceAll('.txt', '').replaceAll('.srt', '')}
            </Text>
          </Flex>
          <Spacer />
          <Text color="impact.100" fontSize="md" ml="5px">
            [{files[0].name.substring(files[0].name.length - 3).toUpperCase()}]
          </Text>
        </Flex>
      )}
      <Box w="298px" h={files === undefined ? '190px' : '170px'}>
        <DropZone setFiles={setFiles} />
      </Box>
      {files === undefined ? (
        <Flex direction="column" p="15px 15px 0px 15px">
          <Text color="white" fontSize="lg">
            파일을 선택하고, 전송 버튼을 누르면 서버에 업로드됩니다.
          </Text>
          <Flex justifyContent="center" mt="20px">
            <Text color="white" fontSize="md">
              자세한 내용은
            </Text>
            <Text
              fontSize="md"
              onClick={() => {
                chrome.tabs.create({
                  url: `${process.env.REACT_APP_WEBPAGE_URL}/qna`,
                });
              }}
              as="u"
              color="#FFB166"
              ml="7px"
            >
              여기
            </Text>
            <Text color="white" fontSize="md">
              를 참고해 주세요.
            </Text>
          </Flex>
        </Flex>
      ) : (
        <Flex direction="column">
          <Flex p="0px 10px 10px 10px" alignItems="center" mt="10px">
            <Text
              color="white"
              w="130px"
              fontSize="md"
              sx={{ fontWeight: 'bold' }}
              align="center"
            >
              자막 언어
            </Text>
            <Spacer />
          </Flex>
          <Flex align="center" m="10px">
            <Button
              colorScheme="teal"
              size="sm"
              h="45px"
              w="130px"
              onClick={preview}
            >
              프리뷰
            </Button>
            <Spacer />
            <Button
              colorScheme="blue"
              size="sm"
              h="45px"
              w="130px"
              onClick={upload}
            >
              업로드
            </Button>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}
