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
import { useState } from 'react';
import SelectLang from '../components/selectLang';
import RateComponent from '../components/rateComponent';
import getFile from '../utils/api/getFile';
import toast, { ToastType } from '../utils/toast';
import subView from '../utils/api/subView';
import { closeMainModal } from '../helpers/modalControl';
import { MESSAGETAG } from '../../../../utils/type';
import getTab from '../utils/getTab';

export type SubtitleType = {
  id: string;
  lang: string;
  rating: number;
  views: number;
  userName: string;
  userId: string;
  uploadDate: Date;
};

type Props = {
  subs: SubtitleType[];
  userId: string | undefined;
};

export default function Subtitle({ subs, userId }: Props) {
  const [lang, setLang] = useState<string | undefined>();
  const getSubById = async (subId: string, subUserId: string) => {
    try {
      const tab = await getTab();
      const currentTime = document.querySelector('video')?.currentTime;
      const duration = document.querySelector('video')?.duration;
      const sub = await getFile(subId);
      await chrome.storage.local.set({ subtitle: JSON.stringify(sub) });
      await subView(subId);
      await toast(ToastType.SUCCESS, 'Subtitle selected');
      if (duration && currentTime && userId !== subUserId) {
        await chrome.runtime.sendMessage({
          tag: MESSAGETAG.REVIEW,
          tabId: tab.id,
          subId,
          time: (duration - currentTime) * 0.7,
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error)
        toast(ToastType.ERROR, `Error at selecting subtitle: ${error.message}`); // maybe change to console.log or other ways
    }
  };

  return (
    <Stack p="10px 20px 10px 20px">
      <Text fontWeight="bold" fontSize="22px" mt="10px" mb="10px">
        {subs.length}개의 자막이 검색되었습니다
      </Text>
      <SelectLang
        width="140px"
        height="30px"
        mainFont="13px"
        subFont="11px"
        lang={lang}
        clickEvent={setLang}
      />
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
            {subs
              .filter((sub: SubtitleType) => !lang || lang === sub.lang)
              .map((sub: SubtitleType) => (
                <Tr
                  _hover={{
                    textColor: 'blue.400',
                  }}
                  key={sub.id}
                  cursor="pointer"
                  onClick={() => {
                    getSubById(sub.id, sub.userId);
                    closeMainModal();
                    document.getElementById('subcloud-main-modal')?.remove();
                  }}
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
