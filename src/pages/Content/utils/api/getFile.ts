import SRTFile from '@younginch/subtitle/dist/subtitles/SRTFile';
import sub from './sub';
import MESSAGETAG from '../../../../../utils/type';

async function getFile(subId: string) {
  const subData = await sub(subId);
  const text = await chrome.runtime.sendMessage({
    tag: MESSAGETAG.GETFILE,
    fileId: subData.fileId,
  });
  const data = SRTFile.fromText(text.data);
  return data;
}

export default getFile;
