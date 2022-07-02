import { Status } from '../../../../../utils/type';
import getTab from '../getTab';
import video from './video';

async function getSubs() {
  const tab = await getTab();
  const videoData = await video(tab.url);
  const subArray = [];
  if (videoData.subs !== undefined) {
    for (let i = 0; i < videoData.subs.length; i += 1) {
      const sub = videoData.subs[i];
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
          uploadDate: sub.updatedAt,
        });
      }
    }
  }
  return subArray;
}

export default getSubs;
