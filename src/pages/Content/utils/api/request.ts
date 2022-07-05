import { postFetch } from '../fetch';
import video from './video';

async function request(url: string, lang: string, point: number) {
  const videoData = await video(url);
  const requestData = await postFetch('user/request', {
    serviceId: videoData.serviceId,
    videoId: videoData.videoId,
    lang,
    point,
  });
}

export default request;
