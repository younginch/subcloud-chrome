import { MESSAGETAG } from '../../../../utils/type';
import sendMessage from './sendMessage';

export default async function CreateTab(url: string) {
  const res = await sendMessage({ tag: MESSAGETAG.CREATETAB, url });
  return res.data;
}
