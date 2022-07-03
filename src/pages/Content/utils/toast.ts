import { MESSAGETAG } from '../../../../utils/type';
import getTab from './getTab';
import sendMessage from './sendMessage';

export const enum ToastType {
  SUCCESS,
  WARNING,
  ERROR,
}

export default async function Toast(msg: string) {
  try {
    const tab = await getTab();
    await sendMessage({ tag: MESSAGETAG.TOAST, msg, tabId: tab.id });
  } catch (error: unknown) {
    if (error instanceof Error) console.log(error.message);
  }
}
