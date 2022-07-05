import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Button, Link, Stack, Text } from '@chakra-ui/react';
import { LoginFirstIcon } from '../components/icons';

export default function HomeLoginFirst() {
  return (
    <Stack p="10px 20px 10px 20px" alignItems="center">
      <LoginFirstIcon size={300} />
      <Text fontWeight="bold" fontSize="22px" mt="-20px !important">
        SubCloud에 로그인해 주세요
      </Text>
      <Text fontSize="18px">
        간편하게 로그인하고 전 세계 유저들이 올린 자막을 무료로 사용하세요
      </Text>
      <Button
        colorScheme="blue"
        variant="solid"
        w="170px"
        h="40px"
        mt="40px !important"
        onClick={() => {
          window.location.href = `${API_URL}/auth/signin?callbackUrl=${window.location.href}`;
        }}
      >
        <Text fontSize="18px">로그인하러 가기</Text>
      </Button>
      <Link
        href={API_URL}
        color="gray.400"
        fontSize="15px"
        mt="10px !important"
      >
        웹페이지 방문
        <ExternalLinkIcon mx="2px" />
      </Link>
    </Stack>
  );
}
