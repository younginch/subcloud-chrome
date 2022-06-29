import { MESSAGETAG } from '../../../../utils/type';
import sendMessage from './sendMessage';

export default async function CurrentTab() {
  const res = await sendMessage({ tag: MESSAGETAG.TAB });
  return res.data;
}
