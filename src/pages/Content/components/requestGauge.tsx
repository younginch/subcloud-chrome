import { CloseIcon, SmallAddIcon } from '@chakra-ui/icons';
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
  const t = chrome.i18n.getMessage;

  let color = 'blue';
  if (point >= goal / 2) color = 'purple';
  if (point >= goal) color = 'red';
  const [lang, setLang] = useState<string | undefined>();

  const handleHide = () => {
    toast(ToastType.INFO, t('RequestGauge_hideToast'), 4000);
  };

  return (
    <HStack w="100%">
      <Text color="#00d9d9" fontWeight="bold" fontSize="17px">
        SubCloud
      </Text>
      <Tooltip
        label={`${t('RequestGauge_hideToast')}: ${point}/${goal}`}
        fontSize="15px"
      >
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
          leftIcon={<SmallAddIcon />}
          borderRadius="7px"
        >
          {t('RequestGauge_request')}
        </Button>
      </Link>
      <SelectLang
        width={140}
        height={28}
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
