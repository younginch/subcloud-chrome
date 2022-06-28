import { useState } from 'react';

function calculateLayout(sliderValue: number): [number, number] | undefined {
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

export default function SubtitleComponent() {
  const [fontSize, setFontSize] = useState<number>(12);
  const [subtitleMt, setSubtitleMt] = useState<number>(300);

  const layoutUpdater = setInterval(() => {
    const res = calculateLayout(60);
    if (res) {
      setFontSize(res[0]);
      setSubtitleMt(res[1]);
    }
  }, 20);

  return (
    <div className="subcloud-placer" style={{ marginTop: `${subtitleMt}px` }}>
      <div className="subcloud-background" style={{ textAlign: 'center' }}>
        <div
          className="line1"
          style={{
            width: 'max-content',
            margin: 'auto',
            fontSize: `${fontSize}px`,
          }}
        >
          SubCloud
        </div>
        <div
          className="line2"
          style={{
            width: 'max-content',
            margin: 'auto',
            fontSize: `${fontSize}px`,
          }}
        />
        <div
          className="line3"
          style={{
            width: 'max-content',
            margin: 'auto',
            fontSize: `${fontSize}px`,
          }}
        />
      </div>
    </div>
  );
}
