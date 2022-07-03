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
import toast from '../utils/toast';

type Props = {
  user: User | undefined;
};

export default function Setting({ user }: Props) {
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

  useEffect(() => {
    chrome.storage.local.get(
      [
        'isBorder',
        'isBackGround',
        'sliderValue',
        'fontColor',
        'fontBorderColor',
        'fontBgColor',
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
      }
    );
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
      });
    } catch (error: unknown) {
      if (error instanceof Error) toast(error.message);
    }
  }, [
    isBorder,
    isBackGround,
    sliderValue,
    fontColor,
    fontBorderColor,
    fontBgColor,
  ]);

  return (
    <Stack
      p="10px 20px 10px 20px"
      maxH="550px"
      overflowX="hidden"
      overflowY="scroll"
    >
      <SettingRow name="로그인 상태:">
        <Text fontSize="18px">{user?.name ?? 'unknown'}</Text>
        <Button
          onClick={() => {
            window.location.href = 'https://subcloud.app/api/auth/signout';
          }}
        >
          로그아웃
        </Button>
      </SettingRow>
      <SettingRow name="포인트:">
        <Text fontSize="18px">{user?.point ?? 0}</Text>
        <Button
          onClick={() => {
            window.location.href = 'https://subcloud.app/buy';
          }}
        >
          충전하기
        </Button>
      </SettingRow>

      <Divider m="10px !important" w="640px" />

      <SettingRow name="자막 크기:">
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

      <SettingRow name="자막 색상:" tooltip="자막 글자의 색상">
        <ColorPicker
          label="색상 선택"
          color={fontColor}
          changeFunction={(c: RGBColor) => setFontColor(c)}
          marginLeft="176.7px"
          activate
        />
      </SettingRow>
      <SettingRow name="자막 배경 색 사용:" tooltip="자막의 배경 색상">
        <Switch
          colorScheme="teal"
          size="lg"
          isChecked={isBackGround}
          onChange={() => setIsBackGround(!isBackGround)}
        />
        <ColorPicker
          label="색상 선택"
          color={fontBgColor}
          changeFunction={(c: RGBColor) => setFontBgColor(c)}
          activate={isBackGround}
        />
      </SettingRow>
      <SettingRow name="자막 테두리 사용:" tooltip="자막의 테두리 색상">
        <Switch
          colorScheme="teal"
          size="lg"
          isChecked={isBorder}
          onChange={() => setIsBorder(!isBorder)}
        />
        <ColorPicker
          label="색상 선택"
          color={fontBorderColor}
          changeFunction={(c: RGBColor) => setFontBorderColor(c)}
          activate={isBorder}
        />
      </SettingRow>
      <SettingRow
        name="자막 양식을 우선시:"
        tooltip={
          <>
            <span>사용자 지정 스타일과 자막파일의 스타일 중</span>
            <br />
            <span>무엇을 우선할지 결정합니다</span>
          </>
        }
      >
        <Switch colorScheme="teal" size="lg" />
      </SettingRow>

      <Divider m="10px !important" w="640px" />

      <SettingRow
        name="기본 요청 언어:"
        tooltip="자막을 요청할 때 기본으로 요청되는 언어"
      >
        <SelectLang
          width="140px"
          height="30px"
          mainFont="13px"
          subFont="11px"
          marginLeft="20px !important"
          clickEvent={() => null}
        />
      </SettingRow>

      <SettingRow
        name="친숙한 언어:"
        tooltip="자막 검색에 기본적으로 사용되는 언어"
      >
        <SelectLang
          width="140px"
          height="30px"
          mainFont="13px"
          subFont="11px"
          marginLeft="20px !important"
          clickEvent={() => null}
        />
      </SettingRow>

      <Divider m="10px !important" w="640px" />

      <SettingRow
        name="자막 발견시 5초간 알림 띄우기:"
        tooltip={
          <>
            <span>
              <b>&apos;친숙한 언어&apos;</b>로 설정한 자막이 있다면
            </span>
            <br />
            <span>영상 시작 시 알림을 보여줍니다</span>
          </>
        }
      >
        <Switch colorScheme="teal" size="lg" />
      </SettingRow>
      <SettingRow
        name="자막 발견시 자동으로 사용하기:"
        tooltip={
          <>
            <span>
              <b>&apos;친숙한 언어&apos;</b>로 설정한 자막이 있다면
            </span>
            <br />
            <span>자동으로 선택합니다</span>
          </>
        }
      >
        <Switch colorScheme="teal" size="lg" />
      </SettingRow>
      <SettingRow
        name="댓글창 자막 요청 버튼 사용:"
        tooltip={
          <>
            <span>댓글창의 오른쪽 위의 요청 버튼을 통해</span>
            <br />
            <span>자막을 요청할 수 있습니다</span>
          </>
        }
      >
        <Switch colorScheme="teal" size="lg" />
      </SettingRow>
    </Stack>
  );
}
