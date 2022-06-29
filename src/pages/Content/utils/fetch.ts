import { MESSAGETAG } from '../../../../utils/type';
import sendMessage from './sendMessage';

async function getFetch(url: string) {
  const res = await sendMessage({
    tag: MESSAGETAG.GETAPI,
    url,
  });
  return res.data;
}

async function postFetch(url: string, body: object) {
  const res = await sendMessage({
    tag: MESSAGETAG.POSTAPI,
    url,
    body,
  });
  return res.data;
}

export { getFetch, postFetch };
