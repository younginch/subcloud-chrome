import { Status } from '../../../../../utils/type';
import { getFetch } from '../fetch';

async function getSubs(videoId: string, serviceId: string) {
  const { data: subs } = await getFetch(
    `public/search/sub?videoId=${videoId}&serviceId=${serviceId}`
  );
  const subArray = [];
  if (subs !== undefined) {
    for (let i = 0; i < subs.length; i += 1) {
      const sub = subs[i];
      if (sub.status === Status.Approved) {
        subArray.push({
          id: sub.id,
          lang: sub.lang,
          rating:
            sub.ratings.length === 0
              ? 0
              : sub.ratings.reduce(
                  (prev: number, curr: any) => prev + curr.score,
                  0
                ) / sub.ratings.length,
          views: sub.views,
          userName: sub.user.name,
          userId: sub.user.id,
          uploadDate: sub.updatedAt,
        });
      }
    }
  }
  return subArray;
}

export default getSubs;
