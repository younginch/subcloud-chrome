export default async function sendMessage(body: object) {
  const res = await chrome.runtime.sendMessage(body);
  if (res.type === 'error') {
    throw new Error(`api error`);
  }
  return res;
}
