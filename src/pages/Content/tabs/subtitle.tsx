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
  const t = chrome.i18n.getMessage;
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

  console.log(subs);

  return (
    <Stack p="10px 20px 10px 20px">
      <Text fontWeight="bold" fontSize="22px" mt="10px" mb="10px">
        {subs.length}
        {subs.length <= 1 ? t('Subtitle_title') : t('Subtitle_title_many')}
      </Text>
      <SelectLang
        width="140px"
        height="30px"
        mainFont="13px"
        subFont="11px"
        lang={lang}
        clickEvent={setLang}
        marginTop="10px !important"
      />
      <TableContainer mt="10px !important" maxH="440px" overflowY="auto">
        <Table variant="striped">
          <TableCaption fontSize="12px">Powered by SubCloud</TableCaption>
          <Thead>
            <Tr>
              <Th fontSize="16px">{t('Subtitle_table_lang')}</Th>
              <Th fontSize="16px">{t('Subtitle_table_rating')}</Th>
              <Th fontSize="16px" isNumeric>
                {t('Subtitle_table_views')}
              </Th>
              <Th fontSize="16px">{t('Subtitle_table_uploader')}</Th>
              <Th fontSize="16px">{t('Subtitle_table_date')}</Th>
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
                      <Text w="10px">{sub.rating}</Text>
                      <RateComponent rating={sub.rating} size="15px" />
                    </HStack>
                  </Td>
                  <Td fontSize="16px" isNumeric>
                    {sub.views}
                  </Td>
                  <Td fontSize="16px">{sub.userName}</Td>
                  <Td fontSize="16px">
                    {new Date(sub.uploadDate).toLocaleDateString()}
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
