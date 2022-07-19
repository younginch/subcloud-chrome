import {
  Button,
  Stack,
  Text,
  Divider,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
  Switch,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { RGBColor } from 'react-color';
import { User } from '../../../../utils/type';
import ColorPicker from '../components/colorPicker';
import SelectLang from '../components/selectLang';
import SettingRow from '../components/settingRow';
import changeBaseLang from '../utils/api/changeBaseLang';
import changeRequestLang from '../utils/api/changeRequestLang';
import getLang from '../utils/api/getLang';
import createTab from '../utils/createTab';
import toast, { ToastType } from '../utils/toast';

type Props = {
  user: User | undefined;
};

export default function Setting({ user }: Props) {
  const t = chrome.i18n.getMessage;
  const [isBorder, setIsBorder] = useState<boolean>(false);
  const [isBackGround, setIsBackGround] = useState<boolean>(true);
  const [sliderValue, setSliderValue] = useState<number>(60);
  const [fontColor, setFontColor] = useState<RGBColor>({
    r: 255,
    g: 255,
    b: 255,
    a: 1,
  });
  const [fontBorderColor, setFontBorderColor] = useState<RGBColor>({
    r: 0,
    g: 0,
    b: 0,
    a: 1,
  });
  const [fontBgColor, setFontBgColor] = useState<RGBColor>({
    r: 0,
    g: 0,
    b: 0,
    a: 0.5,
  });
  const [requestLang, setRequestLang] = useState<string | undefined>();
  const [baseLang, setBaseLang] = useState<string | undefined>();
  const [isQuickSub, setIsQuickSub] = useState<boolean>(false);
  const [isQuickRequest, setIsQuickRequest] = useState<boolean>(false);

  const getLangs = async () => {
    const { requestLangs, baseLangs } = await getLang();
    if (requestLangs && requestLangs.length > 0)
      setRequestLang(requestLangs[0]);
    if (baseLangs && baseLangs.length > 0) setBaseLang(baseLangs[0]);
  };

  useEffect(() => {
    const init = async () => {
      try {
        chrome.storage.local.get(
          [
            'isBorder',
            'isBackGround',
            'sliderValue',
            'fontColor',
            'fontBorderColor',
            'fontBgColor',
            'isQuickRequest',
            'isQuickSub',
          ],
          (result) => {
            if (result.isBorder !== undefined) setIsBorder(result.isBorder);
            if (result.isBackGround !== undefined)
              setIsBackGround(result.isBackGround);
            if (result.sliderValue !== undefined)
              setSliderValue(result.sliderValue);
            if (result.fontColor !== undefined) setFontColor(result.fontColor);
            if (result.fontBorderColor !== undefined)
              setFontBorderColor(result.fontBorderColor);
            if (result.fontBgColor !== undefined)
              setFontBgColor(result.fontBgColor);
            if (result.isQuickRequest !== undefined)
              setIsQuickRequest(result.isQuickRequest);
            if (result.isQuickSub !== undefined)
              setIsQuickSub(result.isQuickSub);
          }
        );
        await getLangs();
      } catch (error: unknown) {
        if (error instanceof Error)
          toast(ToastType.ERROR, `Error at getting settings: ${error.message}`); // maybe change to console.log or other ways
      }
    };
    init();
  }, []);

  useEffect(() => {
    try {
      chrome.storage.local.set({
        isBorder,
        isBackGround,
        sliderValue,
        fontColor,
        fontBorderColor,
        fontBgColor,
        isQuickRequest,
        isQuickSub,
      });
    } catch (error: unknown) {
      if (error instanceof Error)
        toast(ToastType.ERROR, `Error at changing settings: ${error.message}`);
    }
  }, [
    isBorder,
    isBackGround,
    sliderValue,
    fontColor,
    fontBorderColor,
    fontBgColor,
    isQuickRequest,
    isQuickSub,
  ]);

  useEffect(() => {
    try {
      if (requestLang) changeRequestLang(requestLang);
    } catch (error: unknown) {
      if (error instanceof Error)
        toast(
          ToastType.ERROR,
          `Error at changing request lang: ${error.message}`
        );
    }
  }, [requestLang]);

  useEffect(() => {
    try {
      if (baseLang) changeBaseLang(baseLang);
    } catch (error: unknown) {
      if (error instanceof Error)
        toast(
          ToastType.ERROR,
          `Error at changing base lang: ${error.message} `
        );
    }
  }, [baseLang]);

  return (
    <Stack
      p="10px 20px 10px 20px"
      maxH="550px"
      overflowX="hidden"
      overflowY="scroll"
    >
      <SettingRow name={t('Settings_loginStatus')}>
        <Text fontSize="18px">{user?.name ?? 'unknown'}</Text>
        <Button
          onClick={() => {
            createTab(`${API_URL}/api/auth/signout`);
          }}
          fontSize="13px"
          ml="15px !important"
        >
          {t('Settings_logoutBtn')}
        </Button>
      </SettingRow>
      <SettingRow name={t('Settings_point')}>
        <Text fontSize="18px">{user?.point ?? 0}</Text>
        <Button
          onClick={() => {
            createTab(`${API_URL}/buy`);
          }}
          fontSize="13px"
          ml="15px !important"
        >
          {t('Settings_buyBtn')}
        </Button>
      </SettingRow>

      <Divider m="10px !important" w="640px" />

      <SettingRow name={t('Settings_fontSize')}>
        <Slider
          aria-label="slider-ex-4"
          value={sliderValue}
          min={10}
          max={100}
          step={1}
          onChange={(v: number) => setSliderValue(v)}
          w="260px"
        >
          <SliderTrack bg="red.100">
            <SliderFilledTrack bg="tomato" />
          </SliderTrack>
          <SliderThumb boxSize={4}>
            <Box color="tomato" />
          </SliderThumb>
        </Slider>
        <Text fontSize="18px">{sliderValue}</Text>
      </SettingRow>

      <SettingRow name={t('Settings_fontColor')}>
        <ColorPicker
          label={t('Settings_selectColor')}
          color={fontColor}
          changeFunction={(c: RGBColor) => setFontColor(c)}
          marginLeft="176.7px"
          activate
        />
      </SettingRow>
      <SettingRow name={t('Settings_fontBackground')}>
        <Switch
          colorScheme="teal"
          size="lg"
          isChecked={isBackGround}
          onChange={() => setIsBackGround(!isBackGround)}
        />
        <ColorPicker
          label={t('Settings_selectColor')}
          color={fontBgColor}
          changeFunction={(c: RGBColor) => setFontBgColor(c)}
          activate={isBackGround}
        />
      </SettingRow>
      <SettingRow
        name={t('Settings_fontBorder')}
        tooltip={t('Settings_fontBorder_tooltip')}
      >
        <Switch
          colorScheme="teal"
          size="lg"
          isChecked={isBorder}
          onChange={() => setIsBorder(!isBorder)}
        />
        <ColorPicker
          label={t('Settings_selectColor')}
          color={fontBorderColor}
          changeFunction={(c: RGBColor) => setFontBorderColor(c)}
          activate={isBorder}
        />
      </SettingRow>
      <SettingRow
        name={t('Settings_stylePriority')}
        tooltip={
          <>
            <span>{t('Settings_stylePriority_tooltip1')}</span>
            <br />
            <span>{t('Settings_stylePriority_tooltip2')}</span>
          </>
        }
        disabled
      >
        <Switch colorScheme="teal" size="lg" disabled />
      </SettingRow>

      <Divider m="10px !important" w="640px" />

      <SettingRow
        name={t('Settings_defaultRequestLang')}
        tooltip={t('Settings_defaultRequestLang_tooltip')}
      >
        <SelectLang
          width="140px"
          height="30px"
          mainFont="13px"
          subFont="11px"
          marginLeft="20px !important"
          lang={requestLang}
          clickEvent={setRequestLang}
        />
      </SettingRow>

      <SettingRow
        name={t('Settings_familiarLang')}
        tooltip={t('Settings_familiarLang_tooltip')}
      >
        <SelectLang
          width="140px"
          height="30px"
          mainFont="13px"
          subFont="11px"
          marginLeft="20px !important"
          lang={baseLang}
          clickEvent={setBaseLang}
        />
      </SettingRow>

      <Divider m="10px !important" w="640px" />

      <SettingRow
        name={t('Settings_subtitleAlert')}
        tooltip={
          <>
            <span>
              {t('Settings_subtitleAlert_tooltip0')}
              <b>{t('Settings_subtitleAlert_tooltip1')}</b>
              {t('Settings_subtitleAlert_tooltip2')}
            </span>
            <br />
            <span>{t('Settings_subtitleAlert_tooltip3')}</span>
          </>
        }
        disabled
      >
        <Switch colorScheme="teal" size="lg" disabled />
      </SettingRow>
      <SettingRow
        name={t('Settings_autoSelect')}
        tooltip={
          <>
            <span>
              {t('Settings_subtitleAlert_tooltip0')}
              <b>{t('Settings_subtitleAlert_tooltip1')}</b>
              {t('Settings_subtitleAlert_tooltip2')}
            </span>
            <br />
            <span>{t('Settings_autoSelect_tooltip')}</span>
          </>
        }
      >
        <Switch
          colorScheme="teal"
          size="lg"
          isChecked={isQuickSub}
          onChange={() => setIsQuickSub(!isQuickSub)}
        />
      </SettingRow>
      <SettingRow
        name={t('Settings_quickRequest')}
        tooltip={
          <>
            <span>{t('Settings_quickRequest_tooltip1')}</span>
            <br />
            <span>{t('Settings_quickRequest_tooltip2')}</span>
          </>
        }
      >
        <Switch
          colorScheme="teal"
          size="lg"
          isChecked={isQuickRequest}
          onChange={() => setIsQuickRequest(!isQuickRequest)}
        />
      </SettingRow>
    </Stack>
  );
}
