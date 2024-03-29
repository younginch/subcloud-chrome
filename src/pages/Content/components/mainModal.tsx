import { Box, useColorMode } from '@chakra-ui/react';
import { useEffect } from 'react';
import { closeMainModal } from '../helpers/modalControl';
import Layout from './layout';

export default function MainModal() {
  const { colorMode, toggleColorMode } = useColorMode();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const target: HTMLElement = event.target as HTMLElement;
    if (target.id === 'subcloud-main-modal') {
      closeMainModal();
    }
  };

  useEffect(() => {
    if (colorMode === 'light') {
      toggleColorMode();
    }
  });

  return (
    <Box
      id="subcloud-main-modal"
      position="fixed"
      w="100vw"
      h="100vh"
      paddingLeft="calc(50vw - 425px) !important"
      paddingTop="calc(50vh - 300px) !important"
      bg="rgba(0,0,0,.4)"
      zIndex={3000}
      onClick={handleClick}
    >
      <Layout />
    </Box>
  );
}
