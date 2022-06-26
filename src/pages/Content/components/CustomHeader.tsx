import { Heading, HStack, PopoverCloseButton, Spacer } from '@chakra-ui/react';
import ThemeToggleBtn from './themeToggleBtn';

export default function CustomHeader() {
  return (
    <HStack w="100%" pt={1} pl={4} pr="3vw">
      <Heading fontSize="2xl">SubCloud</Heading>
      <Spacer />
      <ThemeToggleBtn />
      <PopoverCloseButton />
    </HStack>
  );
}
