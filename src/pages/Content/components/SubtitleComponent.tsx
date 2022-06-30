import { SRTFile } from '@younginch/subtitle';
import { useState } from 'react';
import calculateLayout from '../helpers/calculateLayout';
import toast from '../utils/toast';

export default function SubtitleComponent() {
  const [fontSize, setFontSize] = useState<number>(12);
  const [subtitleMt, setSubtitleMt] = useState<number>(300);
  const [sub, setSub] = useState<undefined | SRTFile>();
  const [textArray, setTextArray] = useState<undefined | string[]>();

  const layoutUpdater = setInterval(() => {
    try {
      const res = calculateLayout(60);
      if (res) {
        setFontSize(res[0]);
        setSubtitleMt(res[1]);
      }

      chrome.storage.local.get(['subtitle'], (result) => {
        const { lastError } = chrome.runtime;
        if (!lastError && result.subtitle) {
          setSub(Object.assign(new SRTFile(), JSON.parse(result.subtitle)));
        }
      });

      if (!sub) return;
      const cTime = document.querySelector('video')?.currentTime;
      let isSubtitle = false;
      for (let i = 0; i < sub.array.length; i += 1) {
        if (
          cTime &&
          sub.array[i].startTime <= cTime &&
          cTime <= sub.array[i].endTime
        ) {
          setTextArray(sub.array[i].textArray);
          isSubtitle = true;
        }
      }
      if (!isSubtitle) setTextArray([]);
      clearInterval(layoutUpdater);
    } catch (error: unknown) {
      if (error instanceof Error) toast(error.message);
    }
  }, 20);

  return (
    <div className="subcloud-placer" style={{ marginTop: `${subtitleMt}px` }}>
      <div className="subcloud-background" style={{ textAlign: 'center' }}>
        {textArray
          ? textArray.map((text, index) => (
              <div
                className={`line${index}`}
                style={{
                  width: 'max-content',
                  margin: 'auto',
                  fontSize: `${fontSize}px`,
                }}
                // eslint-disable-next-line react/no-array-index-key
                key={index}
              >
                {text}
              </div>
            ))
          : ''}
      </div>
    </div>
  );
}
