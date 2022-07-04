import { MESSAGETAG } from '../../../../utils/type';
import getTab from './getTab';
import sendMessage from './sendMessage';

export const enum ToastType {
  SUCCESS,
  WARNING,
  ERROR,
  INFO,
}

export default async function Toast(type: ToastType, msg: string) {
  try {
    const tab = await getTab();
    await sendMessage({
      tag: MESSAGETAG.TOAST,
      toastType: type,
      msg,
      tabId: tab.id,
    });
  } catch (error: unknown) {
    if (error instanceof Error) console.log(error.message);
  }
}
