/*
창의 크기를 이용해 자막의 크기, 위치를 계산한다.
*/
export default function calculateLayout(sliderValue: number) {
  const outerVideo = document.querySelector(
    '#subcloud-sub-component'
  ) as HTMLElement;
  const outerHeight = outerVideo?.offsetHeight;

  const innerVideos = document.querySelectorAll('.html5-main-video') as any;
  if (innerVideos === null) return undefined;
  let innerVideo;

  for (let i = 0; i < innerVideos.length; i += 1) {
    if (innerVideos[i].closest('#preview') === null) {
      innerVideo = innerVideos[i];
    }
  }

  if (innerVideo === null) return undefined;

  const innerWidth = innerVideo.offsetWidth;
  const innerHeight = innerVideo.offsetHeight;
  const fontSize = (innerWidth / 2500.0) * sliderValue;
  const subtitleMt =
    (outerHeight - innerHeight) / 2 + innerHeight * 0.87 - fontSize / 2;

  return [fontSize, subtitleMt];
}
