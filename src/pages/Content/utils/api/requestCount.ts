import { getFetch } from '../fetch';

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

async function requestCount(serviceId: string, videoId: string) {
  const data = await getFetch(
    `public/search/request?serviceId=${serviceId}&videoId=${videoId}`
  );
  if (Array.isArray(data)) {
    return data.reduce(
      // eslint-disable-next-line no-underscore-dangle
      (prev: number, curr: Request) => prev + curr._count.users,
      0
    );
  }
  return 0;
}

export default requestCount;
