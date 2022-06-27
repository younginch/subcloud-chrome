async function getFetch(url: string) {
  const res = await chrome.runtime.sendMessage({
    tag: 'api',
    type: 'get',
    url,
  });
  return res.data;
}

async function postFetch(url: string, body: object) {
  const res = await chrome.runtime.sendMessage({
    tag: 'api',
    type: 'post',
    url,
    body,
  });
  return res.data;
}

export { getFetch, postFetch };
