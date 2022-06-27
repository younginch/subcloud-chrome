import SRTFile from '@younginch/subtitle/dist/subtitles/SRTFile';
import sub from './sub';

async function getFile(subId: string) {
  const subData = await sub(subId);
  const text = await chrome.runtime.sendMessage({
    tag: 'getFile',
    fileId: subData.fileId,
  });
  const data = SRTFile.fromText(text.data);
  return data;
}

export default getFile;
