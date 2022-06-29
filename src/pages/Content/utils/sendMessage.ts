export default async function sendMessage(body: object) {
  const res = await chrome.runtime.sendMessage(body);
  return res;
}
