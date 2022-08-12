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
import { useState } from 'react';
import toast, { ToastType } from '../utils/toast';
import SelectLang from './selectLang';

type Props = {
  point: number;
  goal: number;
};

export default function RequestGauge({ point, goal }: Props) {
  let color = 'blue';
  if (point >= goal / 2) color = 'purple';
  if (point >= goal) color = 'red';
  const [lang, setLang] = useState<string | undefined>();

  const handleHide = () => {
    toast(
      ToastType.INFO,
      '숨긴 Toolbar는 오른쪽 위의 확장 프로그램에서 다시 켤 수 있습니다.',
      4000
    );
  };

  return (
    <HStack w="100%">
      <Text color="#00d9d9" fontWeight="bold" fontSize="17px">
        SubCloud
      </Text>
      <Tooltip label={`자막 게이지: ${point}/${goal}`} fontSize="15px">
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
          borderRadius="7px"
        >
          요청
        </Button>
      </Link>
      <SelectLang
        width={140}
        height={30}
        delta={20}
        mainFont="13px"
        subFont="13px"
        lang={lang}
        clickEvent={setLang}
        bg="rgba(120,120,120,.3)"
        hoverBg="rgba(100,100,100,.2)"
        activeBg="rgba(130,160,180,.3)"
      />
      <Button
        colorScheme="gray"
        h="25px"
        fontSize="13px"
        onClick={() => handleHide()}
      >
        <CloseIcon />
      </Button>
    </HStack>
  );
}
