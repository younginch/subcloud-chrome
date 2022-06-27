export default async function CurrentTab() {
  const res = await chrome.runtime.sendMessage({ tag: 'get-tab' });
  return res.data;
}
