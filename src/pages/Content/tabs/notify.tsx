/* eslint-disable react/no-array-index-key */
import { BellIcon } from '@chakra-ui/icons';
import { Divider, HStack, Spacer, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import NotifyCard from '../components/notifyCard';
import { getNotices, changeNotices, deleteNotices } from '../utils/api/notice';
import { NotificationType, NotifyType } from '../utils/notify';

export default function Notify() {
  const [unreadNotifications, setUnreadNotifications] = useState<
    NotificationType[]
  >([]);
  const [readNotifications, setReadNotifications] = useState<
    NotificationType[]
  >([]);

  useEffect(() => {
    const init = async () => {
      const notices = await getNotices();
      const read = [];
      const unread = [];
      for (let i = 0; i < notices.length; i += 1) {
        const notification = notices[i];
        if (notification.checked) {
          read.push({
            id: notification.id,
            notifyType: NotifyType.ANNOUNCE,
            title: '공지사항',
            time: notification.createdAt,
            content: notification.notice.message,
            href: `${API_URL}`,
          });
        } else {
          unread.push({
            id: notification.id,
            notifyType: notification.type,
            title: '공지사항',
            time: notification.createdAt,
            content: notification.notice.message,
            href: `${API_URL}`,
          });
        }
      }
      setReadNotifications(read);
      setUnreadNotifications(unread);
    };
    init();
    /*
    setUnreadNotifications([
      {
        notifyType: NotifyType.ANNOUNCE,
        title: '공지사항',
        time: '5 minutes ago',
        content: '자막 선공개 기능 출시! 클릭하여 자세히 보기',
        href: `${API_URL}`,
      },
      {
        notifyType: NotifyType.NEW_SUBTITLE,
        title: '자막 업로드 알림',
        time: '5 minutes ago',
        content:
          '7시간 전 요청했던 [널 지워야해] 영상에 자막이 올라왔어요. 클릭해서 바로보기.',
        href: `${API_URL}`,
      },
      {
        notifyType: NotifyType.REVIEW,
        title: '리뷰 알림',
        time: '5 minutes ago',
        content: '[창모 널 지워야해]자막에 새로운 리뷰가 올라왔어요',
        href: `${API_URL}`,
      },
    ]);
    setReadNotifications([
      {
        notifyType: NotifyType.ANNOUNCE,
        title: '공지사항',
        time: '6 hours ago',
        content: '자막 선공개 기능 출시! 클릭하여 자세히 보기',
        href: `${API_URL}`,
      },
      {
        notifyType: NotifyType.NEW_SUBTITLE,
        title: '자막 업로드 알림',
        time: '17 hours ago',
        content: '7시간 전 요청했던 [널 지워야해] 영상에 자막이 올라왔어요. ',
        href: `${API_URL}`,
      },
      {
        notifyType: NotifyType.REVIEW,
        title: '리뷰 알림',
        time: '2 days ago',
        content: '[창모 널 지워야해]자막에 새로운 리뷰가 올라왔어요',
        href: `${API_URL}`,
      },
    ]);
    */
  }, []);

  const readItem = (index: number) => {
    setReadNotifications((bef: NotificationType[]) => [
      ...bef,
      unreadNotifications[index],
    ]);
    setUnreadNotifications([
      ...unreadNotifications.slice(0, index),
      ...unreadNotifications.slice(index + 1, unreadNotifications.length),
    ]);
    changeNotices(unreadNotifications[index].id);
  };

  const removeItem = (index: number) => {
    setReadNotifications([
      ...readNotifications.slice(0, index),
      ...readNotifications.slice(index + 1, readNotifications.length),
    ]);
    deleteNotices(readNotifications[index].id);
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
          읽지 않은 알림들
        </Text>
        <Spacer />
        <Text fontSize="16px" textAlign="center" color="gray.300">
          클릭하여 자세히 보기
        </Text>
      </HStack>
      <Stack w="100%" spacing="20px" alignItems="center" mt="30px !important">
        {unreadNotifications.map((notify, index) => (
          <NotifyCard
            key={index}
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
          읽은 알림들
        </Text>
      </HStack>
      <Stack w="100%" spacing="20px" alignItems="center" mt="30px !important">
        {readNotifications.map((notify, index) => (
          <NotifyCard
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
