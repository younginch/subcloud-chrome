import { postFetch } from '../fetch';
import video from './video';

async function request(
  serviceId: string,
  videoId: string,
  lang: string,
  point: number
) {
  const requestData = await postFetch('user/request', {
    serviceId,
    videoId,
    lang,
    point,
  });
}

export default request;
