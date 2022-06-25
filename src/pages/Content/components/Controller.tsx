import {
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import './controller.css';
import Layout from './layout';

export default function Controller() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div className="mainContainer">
        <Button onClick={onOpen}>Open Modal</Button>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Layout />
        </ModalContent>
      </Modal>
    </>
  );
}
