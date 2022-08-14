import { getFetch } from '../fetch';

async function DefaultLang(serviceId?: string, videoId?: string) {
  if (!serviceId || !videoId) return undefined;
  const { data: requests } = await getFetch(
    `public/search/request?serviceId=${serviceId}&videoId=${videoId}`
  );
  const browserLang = String(window.navigator.language.split('-')[0]);
  requests.sort((a: any, b: any) => b.point - a.point);
  const request = requests.find((r: any) => r.lang === browserLang);
  if (request && request.point > 0) return browserLang;
  if (requests.length > 0 && requests[0].point > 0) return requests[0];
  return browserLang;
}

export default DefaultLang;
