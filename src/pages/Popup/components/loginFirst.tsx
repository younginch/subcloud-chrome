import {
  Button,
  Heading,
  HStack,
  Link,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { BsMoonStarsFill, BsSun } from 'react-icons/bs';

export default function LoginFirst() {
  const { colorMode, toggleColorMode } = useColorMode();
  const linkColor = useColorModeValue('blue', 'blue.400');
  return (
    <>
      <Text fontSize="17px" mt="35 !important">
        로그인하고 전 세계 유저들이 올린 자막을 무료로 만나보세요.
      </Text>
      <Button colorScheme="blue">로그인하러 가기</Button>
      <Text
        as={Link}
        fontSize="14px"
        color={linkColor}
        onClick={() => chrome.tabs.create({ url: API_URL })}
        mt="35 !important"
      >
        웹페이지 방문
      </Text>
    </>
  );
}
