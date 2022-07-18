/* eslint-disable react/no-array-index-key */
import { BellIcon } from '@chakra-ui/icons';
import { Divider, HStack, Spacer, Stack, Text } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import NotifyCard from '../components/notifyCard';
import { changeNotices, deleteNotices } from '../utils/api/notice';
import { NotificationType } from '../utils/notify';
import toast, { ToastType } from '../utils/toast';

type Props = {
  readNotifications: NotificationType[];
  unreadNotifications: NotificationType[];
  setReadNotifications: Dispatch<SetStateAction<NotificationType[]>>;
  setUnreadNotifications: Dispatch<SetStateAction<NotificationType[]>>;
};

export default function Notify({
  readNotifications,
  unreadNotifications,
  setReadNotifications,
  setUnreadNotifications,
}: Props) {
  const t = chrome.i18n.getMessage;
  const readItem = (index: number) => {
    setReadNotifications((bef: NotificationType[]) => [
      ...bef,
      unreadNotifications[index],
    ]);
    setUnreadNotifications([
      ...unreadNotifications.slice(0, index),
      ...unreadNotifications.slice(index + 1, unreadNotifications.length),
    ]);
    try {
      changeNotices(unreadNotifications[index].id);
    } catch (error: unknown) {
      if (error instanceof Error) toast(ToastType.ERROR, 'Server error'); // maybe change to console.log other ways
    }
  };

  const removeItem = (index: number) => {
    setReadNotifications([
      ...readNotifications.slice(0, index),
      ...readNotifications.slice(index + 1, readNotifications.length),
    ]);
    try {
      deleteNotices(readNotifications[index].id);
    } catch (error: unknown) {
      if (error instanceof Error) toast(ToastType.ERROR, 'Server error'); // maybe change to console.log other ways
    }
  };

  return (
    <Stack
      p="20px 20px 10px 20px"
      overflowY="scroll"
      overflowX="hidden"
      maxH="550px"
    >
      <HStack w="100%" pl="30px" pr="33px">
        <BellIcon w="30px" h="30px" color="red.200" />
        <Text fontWeight="bold" fontSize="23px">
          {t('Notify_unchecked_title')} ({unreadNotifications.length})
        </Text>
        <Spacer />
        <Text fontSize="16px" textAlign="center" color="gray.300">
          {t('Notify_detail')}
        </Text>
      </HStack>
      <Stack w="100%" spacing="20px" alignItems="center" mt="30px !important">
        {unreadNotifications.map((notify, index) => (
          <NotifyCard
            key={notify.id}
            id={notify.id}
            notifyType={notify.notifyType}
            title={notify.title}
            time={notify.time}
            content={notify.content}
            href={notify.href}
            onRemove={() => readItem(index)}
          />
        ))}
      </Stack>
      <Divider
        m="28px !important"
        w="600px"
        h="3px"
        borderColor="gray.400"
        bgColor="gray.400"
      />
      <HStack w="100%" pl="30px" pr="33px">
        <BellIcon w="30px" h="30px" />
        <Text fontWeight="bold" fontSize="23px">
          {t('Notify_checked_title')} ({readNotifications.length})
        </Text>
      </HStack>
      <Stack w="100%" spacing="20px" alignItems="center" mt="30px !important">
        {readNotifications.map((notify, index) => (
          <NotifyCard
            key={notify.id}
            id={notify.id}
            notifyType={notify.notifyType}
            title={notify.title}
            time={notify.time}
            content={notify.content}
            href={notify.href}
            onRemove={() => removeItem(index)}
          />
        ))}
      </Stack>
    </Stack>
  );
}
