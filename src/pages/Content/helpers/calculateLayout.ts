export default function calculateLayout(
  sliderValue: number
): [number, number] | undefined {
  const outerVideo = document.querySelector(
    '#subcloud-sub-component'
  ) as HTMLElement;
  const outerHeight = outerVideo?.offsetHeight;

  const innerVideos = document.querySelectorAll(
    '.html5-main-video'
  ) as NodeListOf<HTMLVideoElement>;
  if (!innerVideos) return undefined;
  let innerVideo;

  for (let i = 0; i < innerVideos.length; i += 1) {
    if (innerVideos[i].closest('#preview') === null) {
      innerVideo = innerVideos[i];
    }
  }

  if (!innerVideo) return undefined;

  const innerWidth = innerVideo.offsetWidth;
  const innerHeight = innerVideo.offsetHeight;
  const fontSize = (innerWidth / 2500.0) * sliderValue;
  const subtitleMt =
    (outerHeight - innerHeight) / 2 + innerHeight * 0.87 - fontSize / 2;

  return [fontSize, subtitleMt];
}
