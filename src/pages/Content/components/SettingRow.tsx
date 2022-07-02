import { HStack, Text, Tooltip } from '@chakra-ui/react';
import { AiOutlineInfoCircle } from 'react-icons/ai';

type Props = {
  name: string;
  children: React.ReactNode;
  tooltip?: string;
};

export default function SettingRow({ name, children, tooltip }: Props) {
  return (
    <HStack mt="10px !important" mb="10px !important">
      <Text fontSize="15px" textAlign="right" w="240px" mr="10px">
        {name}
      </Text>
      {children}
      {tooltip && (
        <Tooltip label={tooltip}>
          <AiOutlineInfoCircle size="20px" fill="#aaa" />
        </Tooltip>
      )}
    </HStack>
  );
}

SettingRow.defaultProps = {
  tooltip: undefined,
};
