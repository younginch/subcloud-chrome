/* eslint-disable react/jsx-props-no-spreading */
import { Box, HStack, Text, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { CustomCard } from './customCard';

type Props = {
  name: string;
  children?: React.ReactNode;
  tooltip?: string | React.ReactNode;
};
export default function SettingRow({ name, children, tooltip }: Props) {
  return (
    <HStack mt="10px !important" mb="10px !important">
      <Text fontSize="15px" textAlign="right" w="240px" mr="10px">
        {name}
      </Text>
      {children}
      {tooltip && (
        <Tooltip label={tooltip} bg="gray.300" fontSize="12px">
          <Box>
            <AiOutlineInfoCircle size="20px" fill="#aaa" />
          </Box>
        </Tooltip>
      )}
    </HStack>
  );
}

SettingRow.defaultProps = {
  tooltip: undefined,
  children: undefined,
};
