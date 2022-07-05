import { getFetch } from '../fetch';

async function sub(subId: string) {
  const data = await getFetch(`user/sub?id=${subId}`);
  return data;
}

export default sub;
