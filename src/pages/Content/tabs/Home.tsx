import {
  Box,
  Button,
  Flex,
  Image,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Spacer,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import $ from 'jquery';
import request from '../utils/api/request';
import requestCount from '../utils/api/requestCount';
import getTab from '../utils/getTab';

export default function Home() {
  const [lang, setLang] = useState('en');
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('http://img.youtube.com/vi/');
  const [count, setCount] = useState<number | undefined>();
  const [point, setPoint] = useState(0);

  const sendRequest = async () => {
    const tab = await getTab();
    await request(tab.url, lang, point);
    const cnt = await requestCount(tab.url);
    setCount(cnt);
  };

  const getVideoInfo = async () => {
    const tab = await getTab();
    if (tab.url) {
      let replaceUrl = tab.url.replace('https://youtu.be/', '');
      replaceUrl = replaceUrl.replace('https://www.youtube.com/embed/', '');
      replaceUrl = replaceUrl.replace('https://www.youtube.com/watch?v=', '');
      const finUrl = replaceUrl.split('&')[0];
      setTitle(
        $(
          'div#container h1.title yt-formatted-string.ytd-video-primary-info-renderer'
        ).text()
      );
      setThumbnail(`http://img.youtube.com/vi/${finUrl}/0.jpg`);
    }
  };

  const getRequestCount = async () => {
    const tab = await getTab();
    const cnt = await requestCount(tab.url);
    setCount(cnt);
  };

  useEffect(() => {
    getVideoInfo();
    getRequestCount();
  }, []);

  return (
    <Flex
      direction="column"
      p={0}
      ml="-15px"
      mr="-15px"
      w="300px"
      h="320px"
      bg="black"
    >
      <Flex mb="10px">
        <Image
          src={thumbnail}
          width="150px"
          height="100px"
          overflow="hidden"
          objectFit="cover"
        />
        <Flex direction="column" p="10px 0px 0px 5px">
          <Text color="#ffbfba" fontSize="sm" pb="3px">
            youtube.com
          </Text>
          <Text
            w="145px"
            color="white"
            fontSize="md"
            pt="15px"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {title}
          </Text>
        </Flex>
      </Flex>
      <Flex
        h="40px"
        p="10px"
        m="10px"
        alignItems="center"
        justifyContent="center"
        bg="original.100"
        borderRadius="10px"
      >
        <Text color="white" fontSize="md">
          요청 언어
        </Text>
        <Spacer />
      </Flex>
      <Flex
        h="40px"
        p="10px"
        m="10px"
        alignItems="center"
        justifyContent="center"
        bg="original.100"
        borderRadius="10px"
      >
        <Tooltip label="tooltip" aria-label="A tooltip">
          <Text color="white" fontSize="md">
            요청 포인트
          </Text>
        </Tooltip>
        <Spacer />
        <Slider
          aria-label="slider-ex-4"
          value={point}
          min={0}
          max={1000}
          step={1}
          onChange={(v: number) => setPoint(v)}
          w="150px"
        >
          <SliderTrack bg="red.100">
            <SliderFilledTrack bg="tomato" />
          </SliderTrack>
          <SliderThumb boxSize={4}>
            <Box color="tomato" />
          </SliderThumb>
        </Slider>
      </Flex>
      <Flex direction="column" alignItems="center" mt={point ? '2px' : '8px'}>
        {point && (
          <Flex alignItems="center">
            <Text color="white" fontSize="md">
              {point} 사용
            </Text>
          </Flex>
        )}
        <Button
          colorScheme="brand"
          size="sm"
          h="40px"
          w="220px"
          onClick={sendRequest}
          fontSize="17px"
          className="HomeRequestButton"
        >
          {lang} 으로 요청
        </Button>
        {count !== undefined ? (
          <Text color="#ffbfba" fontSize="xs" mt="5px">
            {count}명
          </Text>
        ) : (
          <Box h="17px" />
        )}
      </Flex>
    </Flex>
  );
}
