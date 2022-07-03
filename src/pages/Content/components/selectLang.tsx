import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import ISO6391, { LanguageCode } from 'iso-639-1';

type Props = {
  width: number | string;
  height: number | string;
  mainFont?: string;
  subFont?: string;
  marginLeft?: string;
  marginTop?: string | number;
  clickEvent: (code: string) => void;
};

export default function SelectLang({
  width,
  height,
  mainFont,
  marginLeft,
  marginTop,
  subFont,
  clickEvent,
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
        mt={marginTop}
        ml={marginLeft}
      >
        언어 선택
      </MenuButton>
      <MenuList
        maxH="300px"
        overflow="scroll"
        w={width}
        border="none"
        overflowX="hidden"
        className="select-lang-list"
      >
        {codeList.map((code) => (
          <MenuItem
            key={code}
            fontSize={subFont}
            h={height}
            w={width}
            onClick={() => clickEvent(code)}
          >
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
  marginTop: '14px',
};
