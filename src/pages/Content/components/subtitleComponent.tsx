import { SRTFile } from '@younginch/subtitle';
import { useInterval } from '@chakra-ui/react';
import { useState } from 'react';
import { RGBColor } from 'react-color';
import calculateLayout from '../helpers/calculateLayout';
import toast, { ToastType } from '../utils/toast';

export default function SubtitleComponent() {
  const [fontSize, setFontSize] = useState<number>(12);
  const [subtitleMt, setSubtitleMt] = useState<number>(300);
  const [sub, setSub] = useState<SRTFile>();
  const [textArray, setTextArray] = useState<string[]>();
  const [onOff, setOnOff] = useState<boolean>(false);
  const [isBorder, setIsBorder] = useState<boolean>(false);
  const [isBackGround, setIsBackGround] = useState<boolean>(true);
  const [sliderValue, setSliderValue] = useState<number>(60);
  const [fontColor, setFontColor] = useState<RGBColor>({
    r: 255,
    g: 255,
    b: 255,
    a: 1,
  });
  const [fontBorderColor, setFontBorderColor] = useState<RGBColor>({
    r: 0,
    g: 0,
    b: 0,
    a: 1,
  });
  const [fontBgColor, setFontBgColor] = useState<RGBColor>({
    r: 0,
    g: 0,
    b: 0,
    a: 0.5,
  });

  const rgbToString = (c: RGBColor) => `rgba(${c.r},${c.g},${c.b},${c.a})`;
  const keys = [
    'subtitle',
    'onOff',
    'isBorder',
    'isBackGround',
    'sliderValue',
    'fontColor',
    'fontBorderColor',
    'fontBgColor',
  ];

  useInterval(() => {
    try {
      const res = calculateLayout(60);
      if (res) {
        setFontSize(res[0]);
        setSubtitleMt(res[1]);
      }

      chrome.storage.local.get(keys, (result) => {
        const { lastError } = chrome.runtime;
        if (lastError) {
          chrome.tabs.reload();
          return;
        }
        if (result.subtitle && result.subtitle.url === window.location.href)
          setSub(
            Object.assign(new SRTFile(), JSON.parse(result.subtitle.data))
          );
        if (result.onOff !== undefined) setOnOff(result.onOff);
        if (result.isBorder !== undefined) setIsBorder(result.isBorder);
        if (result.isBackGround !== undefined)
          setIsBackGround(result.isBackGround);
        if (result.sliderValue !== undefined)
          setSliderValue(result.sliderValue);
        if (result.fontColor !== undefined) setFontColor(result.fontColor);
        if (result.fontBorderColor !== undefined)
          setFontBorderColor(result.fontBorderColor);
        if (result.fontBgColor !== undefined)
          setFontBgColor(result.fontBgColor);
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
    } catch (error: unknown) {
      if (error instanceof Error)
        toast(ToastType.ERROR, `Error at showing subtitle: ${error.message}`); // maybe change to console.log or other ways
    }
  }, 10);

  return (
    <div className="subcloud-placer" style={{ marginTop: `${subtitleMt}px` }}>
      <div
        className="subcloud-background"
        style={{ textAlign: 'center', touchAction: 'none' }}
        draggable
      >
        {textArray && onOff
          ? textArray.map((text, index) => (
              <div
                className={`line${index}`}
                style={{
                  width: 'max-content',
                  margin: 'auto',
                  fontSize: `${(fontSize / 60) * sliderValue}px`,
                  backgroundColor: `${
                    isBackGround ? rgbToString(fontBgColor) : 'rgba(0,0,0,0)'
                  }`,
                  color: `${rgbToString(fontColor)}`,
                  WebkitTextStroke: `${
                    isBorder
                      ? `0.8px ${rgbToString(fontBorderColor)}`
                      : 'rgba(0,0,0,0)'
                  }`,
                  padding: '0px 4px 0px 4px',
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
