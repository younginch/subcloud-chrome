import { MESSAGETAG } from '../../../../utils/type';
import sendMessage from './sendMessage';

async function getFetch(url: string) {
  const res = await sendMessage({
    tag: MESSAGETAG.GETAPI,
    url,
  });
  return res;
}

async function postFetch(url: string, body: object) {
  const res = await sendMessage({
    tag: MESSAGETAG.POSTAPI,
    url,
    body,
  });
  return res;
}

async function deleteFetch(url: string, body: object) {
  const res = await sendMessage({
    tag: MESSAGETAG.DELETEAPI,
    url,
    body,
  });
  return res;
}

async function patchFetch(url: string, body: object) {
  const res = await sendMessage({
    tag: MESSAGETAG.PATCHAPI,
    url,
    body,
  });
  return res;
}

export { getFetch, postFetch, deleteFetch, patchFetch };
