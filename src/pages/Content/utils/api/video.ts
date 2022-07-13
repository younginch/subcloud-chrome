import { postFetch } from '../fetch';

async function video(url: string) {
  const { data } = await postFetch('user/video', { url });
  return data;
}

export default video;
