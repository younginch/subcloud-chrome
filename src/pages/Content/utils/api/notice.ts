import { getFetch, deleteFetch, patchFetch } from '../fetch';

async function getNotices() {
  const { data } = await getFetch(`user/notice`);
  return data;
}

async function changeNotices(id: string) {
  const { data } = await patchFetch(`user/notice`, { id });
  return data;
}

async function deleteNotices(id: string) {
  const { data } = await deleteFetch(`user/notice`, { id });
  return data;
}

export { getNotices, changeNotices, deleteNotices };
