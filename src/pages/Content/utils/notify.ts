// eslint-disable-next-line import/prefer-default-export
export const enum NotifyType {
  NEW_SUBTITLE = 'New_subtitle',
  REVIEW = 'Review',
  ANNOUNCE = 'Announce',
}

export type NotificationType = {
  id: string;
  notifyType: NotifyType;
  title: string;
  time: string;
  content: string;
  href: string;
};
