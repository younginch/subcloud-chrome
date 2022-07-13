import { Warning } from '../../../../../utils/error';
import { postFetch } from '../fetch';

async function request(
  serviceId: string,
  videoId: string,
  lang: string,
  point: number
) {
  const { type } = await postFetch('user/request', {
    serviceId,
    videoId,
    lang,
    point,
  });
  if (type === 'warning') throw new Warning('warning');
}

export default request;
