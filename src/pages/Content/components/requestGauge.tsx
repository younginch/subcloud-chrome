import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  HStack,
  Link,
  Progress,
  Text,
  Tooltip,
} from '@chakra-ui/react';

type Props = {
  point: number;
  goal: number;
};

export default function RequestGauge({ point, goal }: Props) {
  let color = 'blue';
  if (point >= goal / 2) color = 'purple';
  if (point >= goal) color = 'red';

  return (
    <HStack w="100%">
      <Text color="#00d9d9" fontWeight="bold" fontSize="17px">
        SubCloud
      </Text>
      <Tooltip label={`자막 게이지: ${point}/${goal}`}>
        <Box w="full" ml="7px !important" mr="7px !important">
          <Progress
            hasStripe
            value={(point / goal) * 100}
            colorScheme={color}
            bg="rgba(220,220,220,.2)"
            h="13px"
          />
        </Box>
      </Tooltip>
      <Link
        href={`${API_URL}/video/youtube/-pEYLhQ4v1U/request/create`}
        isExternal
      >
        <Button
          colorScheme="green"
          h="25px"
          fontSize="13px"
          leftIcon={<AddIcon />}
        >
          요청
        </Button>
      </Link>
      <Button colorScheme="gray" h="25px" fontSize="13px">
        <CloseIcon />
      </Button>
    </HStack>
  );
}
