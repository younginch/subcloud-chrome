import { Box, Button, HStack, Spacer, Text } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import { FaExchangeAlt } from 'react-icons/fa';

export type Props = {
  setFiles: Dispatch<SetStateAction<File[] | undefined>>;
  sendCallback: () => void;
};

export default function CheckSubtitle({ setFiles, sendCallback }: Props) {
  return (
    <>
      <Text fontWeight="bold" fontSize="22px" m="10px">
        자막을 검토하고 업로드하세요
      </Text>
      <HStack w="550px">
        <Spacer />
        <Button>다시 업로드</Button>
      </HStack>
      <Box w="550px" h="250px" mt="5px">
        <Text>자막파일 내용</Text>
      </Box>
      <HStack>
        <Button>프리뷰</Button>
        <Button onClick={sendCallback}>전송</Button>
      </HStack>
    </>
  );
}
