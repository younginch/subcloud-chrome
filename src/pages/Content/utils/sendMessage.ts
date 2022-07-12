import { APIError } from '../../../../utils/error';

export default async function sendMessage(body: object) {
  const res = await chrome.runtime.sendMessage(body);
  if (res.type === 'apierror') {
    throw new APIError(`api error`);
  } else if (res.type === 'error') {
    throw new Error(res.error);
  }
  return res;
}
