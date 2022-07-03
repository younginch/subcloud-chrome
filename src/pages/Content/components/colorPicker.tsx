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
  HStack,
} from '@chakra-ui/react';
import { ColorResult, RGBColor, SketchPicker } from 'react-color';
import Swatches from 'react-color/lib/components/swatches/Swatches';
import { rgbToString } from '../utils/colors';

type Props = {
  label: string;
  color: RGBColor;
  changeFunction: (color: RGBColor) => void;
  marginLeft?: string | number;
  activate: boolean;
};

export default function ColorPicker({
  label,
  color,
  changeFunction,
  marginLeft,
  activate,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleColorChange = (newColor: ColorResult) => {
    changeFunction(newColor.rgb);
  };

  return (
    <HStack>
      <Text
        textColor={activate ? 'white' : 'gray.500'}
        fontSize="15px"
        ml={marginLeft}
      >
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
          <Swatches color={color} onChange={handleColorChange} width={380} />
        </PopoverContent>
      </Popover>
    </HStack>
  );
}

ColorPicker.defaultProps = {
  marginLeft: '140px',
};
