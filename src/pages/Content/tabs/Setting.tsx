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
import { RGBColor } from 'react-color';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import ColorPicker from '../components/ColorPicker';
import SettingRow from '../components/SettingRow';

export default function Setting() {
  return (
    <Stack p="10px 20px 10px 20px">
      <SettingRow name="로그인 상태:">
        <Text fontSize="18px">minkyu.lee65@gmail.com</Text>
        <Button>로그아웃</Button>
      </SettingRow>
      <SettingRow name="포인트:">
        <Text fontSize="18px">0</Text>
        <Button>충전하기</Button>
      </SettingRow>

      <Divider />

      <SettingRow name="자막 크기:">
        <Slider
          aria-label="slider-ex-4"
          value={60}
          min={10}
          max={100}
          step={1}
          onChange={(v: number) => null}
          w="260px"
        >
          <SliderTrack bg="red.100">
            <SliderFilledTrack bg="tomato" />
          </SliderTrack>
          <SliderThumb boxSize={4}>
            <Box color="tomato" />
          </SliderThumb>
        </Slider>
        <Text fontSize="18px">0</Text>
      </SettingRow>
      <SettingRow name="자막 배경 색 사용:">
        <Switch colorScheme="teal" size="lg" />
        <AiOutlineInfoCircle size="20px" fill="#aaa" />

        <ColorPicker
          label="색상 선택"
          color={{ r: 255, g: 255, b: 255, a: 1 }}
          changeFunction={(c: RGBColor) => null}
          activate
        />
      </SettingRow>
      <SettingRow name="자막 테두리 사용:">
        <Switch colorScheme="teal" size="lg" />
        <AiOutlineInfoCircle size="20px" fill="#aaa" />
      </SettingRow>
      <SettingRow name="자막 양식을 우선시:">
        <Switch colorScheme="teal" size="lg" />
        <AiOutlineInfoCircle size="20px" fill="#aaa" />
      </SettingRow>

      <Divider />

      <SettingRow name="기본 요청 언어:">
        <Switch colorScheme="teal" size="lg" />
        <AiOutlineInfoCircle size="20px" fill="#aaa" />
      </SettingRow>
      <SettingRow name="친숙한 언어들:">
        <Switch colorScheme="teal" size="lg" />
        <AiOutlineInfoCircle size="20px" fill="#aaa" />
      </SettingRow>

      <Divider />

      <SettingRow name="자막 발견시 5초간 알림 띄우기:">
        <Switch colorScheme="teal" size="lg" />
        <AiOutlineInfoCircle size="20px" fill="#aaa" />
      </SettingRow>
      <SettingRow name="자막 발견시 자동으로 사용하기">
        <Switch colorScheme="teal" size="lg" />
        <AiOutlineInfoCircle size="20px" fill="#aaa" />
      </SettingRow>
      <SettingRow name="댓글창 자막 요청 버튼 사용:">
        <Switch colorScheme="teal" size="lg" />
        <AiOutlineInfoCircle size="20px" fill="#aaa" />
      </SettingRow>
    </Stack>
  );
}
