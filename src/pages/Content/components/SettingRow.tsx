import { HStack, Text } from '@chakra-ui/react';

type Props = {
  name: string;
  children: React.ReactNode;
};

export default function SettingRow({ name, children }: Props) {
  return (
    <HStack mt="10px !important" mb="10px !important">
      <Text fontSize="15px" textAlign="right" w="240px" mr="10px">
        {name}
      </Text>
      {children}
    </HStack>
  );
}
