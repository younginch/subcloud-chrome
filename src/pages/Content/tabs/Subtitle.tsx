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
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import SelectLang from '../components/selectLang';
import RateComponent from '../components/RateComponent';
import getFile from '../utils/api/getFile';
import toast from '../utils/toast';
import getSubs from '../utils/api/getSubs';

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

  const getSubtitles = async () => {
    try {
      const subArray = await getSubs();
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
    getSubtitles();
  }, []);

  return (
    <Stack p="10px 20px 10px 20px">
      <Text fontWeight="bold" fontSize="22px" mt="10px" mb="10px">
        전 세계 유저들이 제작한 자막을 사용해 보세요
      </Text>
      <SelectLang width="140px" height="30px" mainFont="13px" subFont="11px" />
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
