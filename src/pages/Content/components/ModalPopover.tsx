import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react';
import './modalPopover.css';
import Layout from './layout';

export default function ModalPopover() {
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
