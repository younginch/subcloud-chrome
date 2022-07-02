import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import ISO6391, { LanguageCode } from 'iso-639-1';

type Props = {
  width: number | string;
  height: number | string;
  mainFont?: string;
  subFont?: string;
  marginLeft?: string;
};

export default function SelectLang({
  width,
  height,
  mainFont,
  marginLeft,
  subFont,
}: Props) {
  const codeList: LanguageCode[] = [
    'en',
    'fr',
    'de',
    'it',
    'es',
    'pt',
    'ru',
    'ja',
    'zh',
    'ko',
  ];

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        fontSize={mainFont}
        w={width}
        h={height}
        borderRadius="10px"
        mt="14px"
        ml={marginLeft}
      >
        언어 선택
      </MenuButton>
      <MenuList maxH="450px" overflow="scroll" w={width}>
        {codeList.map((code) => (
          <MenuItem key={code} w={width} fontSize={subFont}>
            {`${ISO6391.getName(code)} (${ISO6391.getNativeName(code)})`}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

SelectLang.defaultProps = {
  mainFont: '13px',
  subFont: '11px',
  marginLeft: '0px',
};
