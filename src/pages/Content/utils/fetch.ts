import MESSAGETAG from '../../../../utils/type';

async function getFetch(url: string) {
  const res = await chrome.runtime.sendMessage({
    tag: MESSAGETAG.GETAPI,
    url,
  });
  return res.data;
}

async function postFetch(url: string, body: object) {
  const res = await chrome.runtime.sendMessage({
    tag: MESSAGETAG.POSTAPI,
    url,
    body,
  });
  return res.data;
}

export { getFetch, postFetch };
