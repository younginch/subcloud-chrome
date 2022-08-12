import { getFetch } from '../fetch';

async function requestPoint(serviceId: string, videoId: string, lang?: string) {
  if (!lang) return 0;
  const { data: requests } = await getFetch(
    `public/search/request?serviceId=${serviceId}&videoId=${videoId}`
  );
  const request = requests.find((r: any) => r.lang === lang);
  return request ? request.point : 0;
}

export default requestPoint;
