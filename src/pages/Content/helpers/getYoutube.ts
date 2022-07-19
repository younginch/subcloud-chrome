export default function getYoutubeId(url: URL): string | null {
  if (url.pathname !== '/watch') {
    if (url.hostname === 'youtu.be') {
      return url.pathname.split('/')[1];
    }
    throw new Error('Not a video url');
  }
  return url.searchParams.get('v');
}
