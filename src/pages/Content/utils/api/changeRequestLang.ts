import { patchFetch } from '../fetch';

async function changeRequestLang(requestLang: string) {
  const { data } = await patchFetch('user/lang', { requestLang });
  return data;
}

export default changeRequestLang;
