import { getFetch } from '../fetch';

async function getLang() {
  const data = await getFetch(`user/lang`);
  return data;
}

export default getLang;
