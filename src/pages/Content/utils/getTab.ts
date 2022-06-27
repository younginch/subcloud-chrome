import MESSAGETAG from '../../../../utils/type';

export default async function CurrentTab() {
  const res = await chrome.runtime.sendMessage({ tag: MESSAGETAG.TAB });
  return res.data;
}
