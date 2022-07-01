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
} from '@chakra-ui/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';

type SubtitleType = {
  lang: string;
  rating: number;
  views: number;
  userName: string;
};

function createRandomSubtitle() {
  return {
    lang: faker.random.locale(),
    rating: Math.round(Math.random() * 50) / 10,
    views: Math.round(Math.random() * 1000),
    userName: faker.name.firstName(),
  };
}

export default function Subtitle() {
  const subs: SubtitleType[] = [];
  Array.from({ length: 10 }).forEach(() => {
    subs.push(createRandomSubtitle());
  });

  return (
    <Stack p="10px 20px 10px 20px">
      <Text fontWeight="bold" fontSize="22px" mt="10px" mb="10px">
        전 세계 유저들이 제작한 자막을 사용해 보세요
      </Text>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Powered by SubCloud</TableCaption>
          <Thead>
            <Tr>
              <Th>언어</Th>
              <Th>평점</Th>
              <Th isNumeric>사용 횟수</Th>
              <Th>제작자</Th>
            </Tr>
          </Thead>
          <Tbody>
            {subs.map((sub: SubtitleType) => (
              <Tr>
                <Td>{sub.lang}</Td>
                <Td>{sub.rating}</Td>
                <Td isNumeric>{sub.views}</Td>
                <Td>{sub.userName}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
