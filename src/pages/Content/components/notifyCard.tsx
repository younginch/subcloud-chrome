import { Box, Flex, HStack, Stack, Text } from '@chakra-ui/react';
import { AiOutlineBug, AiOutlineYoutube } from 'react-icons/ai';
import { HiOutlineSpeakerphone } from 'react-icons/hi';
import { MdOutlineRateReview } from 'react-icons/md';
import { CloseIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import { NotifyType } from '../utils/notify';

type Props = {
  notifyType: NotifyType;
  title: string;
  time: string;
  content: string;
  href: string;
  onRemove: () => void;
};

export default function NotifyCard({
  notifyType,
  title,
  time,
  content,
  href,
  onRemove,
}: Props) {
  let labelColor;
  let timeColor;
  let notifyIcon;

  switch (notifyType) {
    case NotifyType.ANNOUNCE:
      labelColor = 'blue.600';
      timeColor = 'blue.300';
      notifyIcon = <HiOutlineSpeakerphone size="30px" stroke="#bbbbbb" />;
      break;
    case NotifyType.NEW_SUBTITLE:
      labelColor = 'red.400';
      timeColor = 'red.300';
      notifyIcon = <AiOutlineYoutube size="30px" stroke="#bbbbbb" />;
      break;
    case NotifyType.REVIEW:
      labelColor = 'purple.600';
      timeColor = 'purple.300';
      notifyIcon = <MdOutlineRateReview size="30px" stroke="#bbbbbb" />;
      break;
    default:
      labelColor = 'white';
      timeColor = 'white';
      notifyIcon = <AiOutlineBug size="30px" stroke="#bbbbbb" />;
  }

  return (
    <motion.div
      whileHover={{
        scale: 1.025,
        transition: { duration: 0.1 },
      }}
    >
      <HStack
        w="600px"
        borderRadius="7px"
        overflow="hidden"
        bg="bgColor.300"
        h="77px"
      >
        <Box w="6px" h="100%" bg={labelColor} />
        <HStack
          pt="15px"
          pb="15px"
          h="fit-content"
          ml="0px !important"
          w="full"
        >
          <Flex
            h="100%"
            w="100px"
            alignItems="center"
            justifyContent="center"
            ml="0px !important"
          >
            {notifyIcon}
          </Flex>
          <Stack
            w="full"
            ml="0px !important"
            h="100% !important"
            justifyContent="center"
            onClick={() => {
              window.location.href = href;
            }}
            cursor="pointer"
          >
            <HStack spacing="25px">
              <Text fontSize="17px" fontWeight="bold">
                {title}
              </Text>
              <Text fontSize="14px" color={timeColor}>
                {time}
              </Text>
            </HStack>
            <Text fontSize="14px">{content}</Text>
          </Stack>
          <Flex
            h="100%"
            w="60px"
            alignItems="center"
            justifyContent="center"
            ml="0px !important"
          >
            <CloseIcon
              w="30px"
              h="30px"
              p="7px"
              _hover={{ bg: labelColor }}
              borderRadius="50%"
              opacity={0.3}
              onClick={onRemove}
              cursor="pointer"
            />
          </Flex>
        </HStack>
      </HStack>
    </motion.div>
  );
}
