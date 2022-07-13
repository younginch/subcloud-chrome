import { patchFetch, postFetch } from '../fetch';

async function sendRating(subId: string, score: number, message?: string) {
  const comment =
    message && message !== null && message !== ''
      ? message
      : `Your sub rated as ${score}`;
  const { data: rating, type } = await postFetch('user/rating', {
    subId,
    score,
    comment,
  });
  if (type === 'success') return rating;
  const { data } = await patchFetch('user/rating', {
    id: rating.id,
    score,
    comment,
  });
  return data;
}

export default sendRating;
