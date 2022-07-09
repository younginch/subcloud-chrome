import { postFetch } from '../fetch';

async function sendRating(subId: string, score: number, comment: string) {
  const rating = await postFetch('user/rating', {
    subId,
    score,
    comment,
  });
}

export default sendRating;
