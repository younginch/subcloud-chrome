import MESSAGETAG from '../../../../../utils/type';

async function uploadFile(
  fileText: string,
  fileName: string,
  url: string,
  lang: string
) {
  const data = await chrome.runtime.sendMessage({
    tag: MESSAGETAG.UPLOADFILE,
    fileText,
    fileName,
    url,
    lang,
  });
  return data;
}

export default uploadFile;
