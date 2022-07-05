import { postFetch } from '../fetch';

async function video(url: string) {
  const data = postFetch('user/video', { url });
  return data;
}

export default video;
