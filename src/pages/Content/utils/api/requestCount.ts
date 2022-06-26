import { getFetch } from '../fetch';
import video from './video';

type Request = {
  id: string;
  serviceId: string;
  videoId: string;
  lang: string;
  point: number;
  _count: {
    users: number;
  };
};

async function requestCount(url: string) {
  const videoData = await video(url);
  const data = await getFetch(
    `request/search?serviceId=${videoData.serviceId}&videoId=${videoData.videoId}`
  );
  // eslint-disable-next-line no-underscore-dangle
  return data.reduce(
    (prev: number, curr: Request) => prev + curr._count.users,
    0
  );
}

export default requestCount;
