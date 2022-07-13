import { postFetch } from '../fetch';

async function subView(subId: string) {
  const viewAt = new Date();
  const { data } = await postFetch(`user/sub/view?id=${subId}`, { viewAt });
  return data;
}

export default subView;
