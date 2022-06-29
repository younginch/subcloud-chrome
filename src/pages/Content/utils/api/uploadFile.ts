import { MESSAGETAG } from '../../../../../utils/type';
import sendMessage from '../sendMessage';

async function uploadFile(
  fileText: string,
  fileName: string,
  url: string,
  lang: string
) {
  const data = await sendMessage({
    tag: MESSAGETAG.UPLOADFILE,
    fileText,
    fileName,
    url,
    lang,
  });
  return data;
}

export default uploadFile;
