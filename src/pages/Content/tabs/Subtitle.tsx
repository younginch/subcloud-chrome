import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Stack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  HStack,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import ISO6391, { LanguageCode } from 'iso-639-1';
import { useEffect, useState } from 'react';
import RateComponent from '../components/RateComponent';
import video from '../utils/api/video';
import getTab from '../utils/getTab';
import getFile from '../utils/api/getFile';
import toast from '../utils/toast';
import { Status } from '../../../../utils/type';

type SubtitleType = {
  id: string;
  lang: string;
  rating: number;
  views: number;
  userName: string;
  uploadDate: Date;
};

export default function Subtitle() {
  const [subs, setSubs] = useState<SubtitleType[]>([]);

  const getSubs = async () => {
    try {
      const tab = await getTab();
      const videoData = await video(tab.url);
      const subArray = [];
      if (videoData.subs !== undefined) {
        for (let i = 0; i < videoData.subs.length; i += 1) {
          const sub = videoData.subs[i];
          if (sub.status === Status.Approved) {
            subArray.push({
              id: sub.id,
              lang: sub.lang,
              rating:
                sub.ratings.length === 0
                  ? 0
                  : sub.ratings.reduce(
                      (prev: number, curr: any) => prev + curr.score,
                      0
                    ) / sub.ratings.length,
              views: sub.views,
              userName: sub.user.name,
              uploadDate: sub.updatedAt,
            });
          }
        }
      }
      setSubs(subArray);
    } catch (error: unknown) {
      if (error instanceof Error) toast(error.message);
    }
  };

  const getSubById = async (subId: string) => {
    try {
      const sub = await getFile(subId);
      await chrome.storage.local.set({ subtitle: JSON.stringify(sub) });
    } catch (error: unknown) {
      if (error instanceof Error) toast(error.message);
    }
  };

  useEffect(() => {
    getSubs();
  }, []);

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
    <Stack p="10px 20px 10px 20px">
      <Text fontWeight="bold" fontSize="22px" mt="10px" mb="10px">
        전 세계 유저들이 제작한 자막을 사용해 보세요
      </Text>
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          fontSize="13px"
          w="140px"
          h="30px"
          borderRadius="10px"
          mt="14px"
        >
          언어 선택
        </MenuButton>
        <MenuList maxH="450px" overflow="scroll" w="140px">
          {codeList.map((code) => (
            <MenuItem key={code} w="140px" fontSize="11px">
              {`${ISO6391.getName(code)} (${ISO6391.getNativeName(code)})`}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <TableContainer mt="7px" maxH="440px" overflowY="scroll">
        <Table variant="striped">
          <TableCaption fontSize="12px">Powered by SubCloud</TableCaption>
          <Thead>
            <Tr>
              <Th fontSize="16px">언어</Th>
              <Th fontSize="16px">평점</Th>
              <Th fontSize="16px" isNumeric>
                사용 횟수
              </Th>
              <Th fontSize="16px">제작자</Th>
              <Th fontSize="16px">제작일</Th>
            </Tr>
          </Thead>
          <Tbody h="50px">
            {subs.map((sub: SubtitleType) => (
              <Tr
                _hover={{
                  textColor: 'blue.400',
                }}
                key={sub.id}
                cursor="pointer"
                onClick={() => getSubById(sub.id)}
              >
                <Td fontSize="16px">{sub.lang}</Td>
                <Td fontSize="16px">
                  <HStack>
                    <Text w="30px">{sub.rating}</Text>
                    <RateComponent rating={sub.rating} size="15px" />
                  </HStack>
                </Td>
                <Td fontSize="16px" isNumeric>
                  {sub.views}
                </Td>
                <Td fontSize="16px">{sub.userName}</Td>
                <Td fontSize="16px">{sub.uploadDate.toString()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
