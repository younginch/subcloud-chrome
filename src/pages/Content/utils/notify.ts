// eslint-disable-next-line import/prefer-default-export
export const enum NotifyType {
  NEW_SUBTITLE,
  REVIEW,
  ANNOUNCE,
}

export type NotificationType = {
  notifyType: NotifyType;
  title: string;
  time: string;
  content: string;
  href: string;
};
