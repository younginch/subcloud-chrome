/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  Box,
  Text,
  Flex,
  useDisclosure,
  PopoverTrigger,
  PopoverContent,
  Popover,
} from '@chakra-ui/react';
import { ColorResult, RGBColor, SketchPicker } from 'react-color';
import { rgbToString } from '../utils/colors';

type Props = {
  label: string;
  color: RGBColor;
  changeFunction: (color: RGBColor) => void;
  activate: boolean;
};

export default function ColorPicker({
  label,
  color,
  changeFunction,
  activate,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleColorChange = (newColor: ColorResult) => {
    changeFunction(newColor.rgb);
  };

  return (
    <Flex width="200px" mb="7px">
      <Text textColor={activate ? 'white' : 'gray.500'} fontSize="md">
        {label}
      </Text>
      <Popover>
        <PopoverTrigger>
          <Box
            w="50px"
            h="20px"
            bg={rgbToString(color)}
            borderColor="white"
            borderWidth="2px"
            onClick={onOpen}
          />
        </PopoverTrigger>
        <PopoverContent w="fit-content" h="fit-content">
          <SketchPicker color={color} onChange={handleColorChange} />
        </PopoverContent>
      </Popover>
    </Flex>
  );
}
