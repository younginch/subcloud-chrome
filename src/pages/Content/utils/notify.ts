// eslint-disable-next-line import/prefer-default-export
export const enum NotifyType {
  NEW_SUBTITLE = 'Upload',
  REVIEW = 'Review',
  ANNOUNCE = 'Announce',
  STATUSCHANGE = 'StatusChange',
}

export type NotificationType = {
  id: string;
  notifyType: NotifyType;
  title: string;
  time: string;
  content: string;
  href?: string;
};
