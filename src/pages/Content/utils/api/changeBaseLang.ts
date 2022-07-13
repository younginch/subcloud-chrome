import { patchFetch } from '../fetch';

async function changeBaseLang(baseLang: string) {
  const res = await patchFetch('user/lang', { baseLang });
  return res.data;
}

export default changeBaseLang;
