import { patchFetch } from '../fetch';

async function changeBaseLang(baseLang: string) {
  const data = patchFetch('user/lang', { baseLang });
  return data;
}

export default changeBaseLang;
