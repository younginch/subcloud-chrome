import {
  Button,
  ButtonGroup,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react';
import './controller.css';
import Layout from './layout';

export default function Controller() {
  return (
    <Popover variant="responsive" placement="top-start">
      <PopoverTrigger>
        <Button colorScheme="pink">Popover Target</Button>
      </PopoverTrigger>
      <PopoverContent w="fit-content" h="fit-content">
        <Layout />
      </PopoverContent>
    </Popover>
  );
}
