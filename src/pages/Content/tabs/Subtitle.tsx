import {
  Box,
  Flex,
  Table,
  Th,
  Tr,
  Spacer,
  Text,
  Thead,
  CircularProgress,
  Image,
  Button,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import video from '../utils/api/video';
import getTab from '../utils/getTab';
import getFile from '../utils/api/getFile';
import TableRow from '../components/TableRow';

enum Status {
  Pending = 'Pending',
  InReview = 'InReview',
  Approved = 'Approved',
  Rejected = 'Rejected',
  Reported = 'Reported',
  Private = 'Private',
}

type SubType = {
  id: string;
  username: string;
  subLang: string;
  views: number;
  status: Status;
};

export default function Subtitle() {
  const [lang, setLang] = useState('All Lang');
  const [subs, setSubs] = useState<undefined | SubType[]>();
  const width = ['80px', '50px', '70px', '100px', '100px'];

  const getSubs = async () => {
    const tab = await getTab();
    const videoData = await video(tab.url);
    const subArray = [];
    if (videoData.subs !== undefined) {
      for (let i = 0; i < videoData.subs.length; i += 1) {
        const { status } = videoData.subs[i];
        subArray.push({
          id: videoData.subs[i].id,
          username: videoData.subs[i].user.name,
          subLang: videoData.subs[i].lang,
          views: videoData.subs[i].views,
          status,
        });
      }
    }
    setSubs(subArray);
  };

  const getSubById = async (subId: string) => {
    const sub = await getFile(subId);
    await chrome.storage.local.set({ subtitle: JSON.stringify(sub) });
  };

  useEffect(() => {
    getSubs();
  }, []);

  return (
    <Flex direction="column" ml="-15px" mr="-15px" w="100%" h="100%">
      <Flex p="10px 15px 0px 10px" alignItems="center" mb="20px">
        <Text fontSize="xl" color="white">
          자막 찾기
        </Text>
        <Spacer />
      </Flex>
      <Box
        overflowY="scroll"
        maxHeight="200px"
        overflowX="scroll"
        sx={{
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px',
            borderRadius: '3px',
            backgroundColor: `rgba(200, 200, 200, 0.3)`,
          },
          '&::-webkit-scrollbar-thumb': {
            width: '6px',
            height: '6px',
            borderRadius: '3px',
            backgroundColor: `rgba(200, 200, 200, 0.6)`,
          },
        }}
      >
        <Table size="sm" className="table-tiny">
          <Thead bgColor="black">
            <Tr>
              <Th minW={width[0]} color="white" fontSize="15px">
                언어
              </Th>
              <Th minW={width[1]} color="white" fontSize="15px">
                평점
              </Th>
              <Th minW={width[2]} color="white" fontSize="15px">
                조회수
              </Th>
              <Th minW={width[3]} color="white" fontSize="15px">
                상태
              </Th>
              <Th minW={width[4]} color="white" fontSize="15px">
                제작자
              </Th>
            </Tr>
          </Thead>
          {subs !== undefined
            ? subs
                .filter((sub) => sub.subLang === lang || lang === 'All Lang')
                .map((sub) => (
                  <TableRow
                    lang={sub.subLang}
                    rating={4.3}
                    viewCount={sub.views}
                    status={sub.status}
                    madeBy={sub.username}
                    onClick={() => getSubById(sub.id)}
                  />
                ))
            : ''}
        </Table>
      </Box>
    </Flex>
  );
}
