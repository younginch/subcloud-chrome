import { ViewIcon } from '@chakra-ui/icons';
import { Box, Button, HStack, Spacer, Text } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import { IoMdCloudUpload } from 'react-icons/io';

export type Props = {
  setFiles: Dispatch<SetStateAction<File[] | undefined>>;
  sendCallback: () => void;
};

export default function CheckSubtitle({ setFiles, sendCallback }: Props) {
  const subtitleContent = `1
  00:00:19,552 --> 00:00:23,165
  If I was your man, but not.
  
  2
  00:00:23,165 --> 00:00:25,162
  We would have go to deokso alleypub.
  
  3
  00:00:25,162 --> 00:00:28,482
  They would welcome me, my fucking friends.
  
  4
  00:00:28,482 --> 00:00:31,182
  Beside you, the prince who will soon have seoul.
  
  5
  00:00:31,182 --> 00:00:34,282
  I make money, enough to buy you saim, sejong.
  
  6
  00:00:34,282 --> 00:00:36,437
  But the one who has you is my best friend.
  
  7
  00:00:36,454 --> 00:00:38,968
  In a small town that kinda feeling is forbidden
  
  8
  00:00:38,968 --> 00:00:41,997
  I wanna dance shuffle and get your heart, pshcye's heart
  
  9
  00:00:41,997 --> 00:00:44,587
  Your heart will never know my real mind.
  
  10
  00:00:44,587 --> 00:00:46,473
  Until you die naturally.
  
  11
  00:00:46,491 --> 00:00:49,358
  2AM song, my iPhone's ringtone.
  
  12
  00:00:49,358 --> 00:00:51,882
  Don't want to offend my friend.
  
  13
  00:00:51,882 --> 00:00:54,453
  I don't betray my friend, protect my friendship.
  
  14
  00:00:54,453 --> 00:00:56,937
  Till I die, It is sure. I only have my friends.
  
  15
  00:00:56,950 --> 00:00:59,740
  Vow, loyal to each other, Me and him are like that.
  
  16
  00:00:59,740 --> 00:01:02,460
  This makes us different from other fucking guys.`;
  const textLines = subtitleContent.split('\n');

  return (
    <>
      <Text fontWeight="bold" fontSize="22px" m="10px">
        자막을 검토하고 업로드하세요
      </Text>
      <HStack w="550px">
        <Text fontSize="13px">파일 미리보기 (총 {textLines.length}줄)</Text>
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
        {textLines.map((text) => (
          <Text fontSize="14px" key={text}>
            {text}
          </Text>
        ))}
      </Box>
      <HStack mt="20px !important" spacing="120px">
        <Button
          leftIcon={<ViewIcon w="20px" h="20px" />}
          h="45px"
          w="130px"
          colorScheme="blue"
        >
          <Text fontSize="18px">프리뷰</Text>
        </Button>
        <Button
          leftIcon={<IoMdCloudUpload size="20px" />}
          onClick={sendCallback}
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
