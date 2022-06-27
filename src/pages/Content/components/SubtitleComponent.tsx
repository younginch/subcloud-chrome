import { useState } from 'react';
import calculateLayout from '../functions/calculateLayout';

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
