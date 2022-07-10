import { postFetch } from '../fetch';

async function sendRating(subId: string, score: number, message?: string) {
  const comment =
    message && message !== null && message !== ''
      ? message
      : `Your sub rated as ${score}`;
  const rating = await postFetch('user/rating', {
    subId,
    score,
    comment,
  });
}

export default sendRating;
