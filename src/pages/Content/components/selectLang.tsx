/* eslint-disable react/require-default-props */
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import ISO6391, { LanguageCode } from 'iso-639-1';
import { useEffect, useState } from 'react';

type Props = {
  width: number;
  height: number;
  delta?: number;
  mainFont?: string;
  subFont?: string;
  marginLeft?: string;
  marginTop?: string | number;
  lang: string | undefined;
  clickEvent: (code: string) => void;
  bg?: string;
  hoverBg?: string;
  activeBg?: string;
};

export default function SelectLang({
  width,
  height,
  delta = 0,
  mainFont,
  marginLeft,
  marginTop,
  subFont,
  lang,
  clickEvent,
  bg,
  hoverBg,
  activeBg,
}: Props) {
  const t = chrome.i18n.getMessage;
  const [codeList, setCodeList] = useState<LanguageCode[]>();
  useEffect(() => {
    fetch('https://strapi.subcloud.app/api/supported-language')
      .then((res) => res.json())
      .then((data) => setCodeList(data.data.attributes.body));
  }, []);

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        fontSize={mainFont}
        w={`${width}px`}
        minW="fit-content"
        h={`${height}px`}
        borderRadius="9px"
        mt={marginTop}
        ml={marginLeft}
        bg={bg}
        _hover={{ bg: hoverBg }}
        _active={{ bg: activeBg }}
      >
        {lang ? ISO6391.getNativeName(lang) : t('SelectLang_default')}
      </MenuButton>
      {codeList && (
        <MenuList
          maxH="300px"
          overflow="scroll"
          w={`${width + delta}px`}
          border="none"
          overflowX="hidden"
          className="select-lang-list"
        >
          {codeList.map((code) => (
            <MenuItem
              key={code}
              fontSize={subFont}
              h={`${height}px`}
              w={`${width + delta}px`}
              onClick={() => clickEvent(code)}
              color="white"
            >
              {`${ISO6391.getName(code)} (${ISO6391.getNativeName(code)})`}
            </MenuItem>
          ))}
        </MenuList>
      )}
    </Menu>
  );
}

SelectLang.defaultProps = {
  mainFont: '13px',
  subFont: '11px',
  marginLeft: '0px',
  marginTop: '14px',
};
