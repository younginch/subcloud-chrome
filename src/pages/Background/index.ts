import MESSAGETAG from '../../../utils/type';

const apiUrl = 'http://localhost:3000'; // 'https://subcloud.app';

async function getTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

async function getAPI(url: string) {
  const res = await fetch(`${apiUrl}/api/${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
    mode: 'no-cors',
  });
  const data = await res.json();
  return data;
}

async function postAPI(url: string, body: object) {
  const res = await fetch(`${apiUrl}/api/${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return data;
}

async function getFile(sendResponse: (res: object) => void, fileId: string) {
  const fileObject = await getAPI(`file?id=${fileId}`);
  const rawFile = await fetch(fileObject.url);
  const blobFile = await rawFile.blob();
  const file = new File([blobFile], fileObject.title, {
    type: blobFile.type,
  });
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = () => {
    sendResponse({ data: String(reader.result) });
  };
}

async function uploadFile(
  sendResponse: (res: object) => void,
  fileText: string,
  fileName: string,
  url: string,
  lang: string
) {
  const file = new File([fileText], fileName);
  const formData = new FormData();
  formData.append('file', file);
  const videoData = await postAPI('video', { url });
  const fileResponse = await fetch(`${apiUrl}/api/file/upload`, {
    method: 'POST',
    body: formData,
  });
  const fileData = await fileResponse.json();
  const data = await postAPI('sub', {
    fileId: fileData.id,
    serviceId: videoData.serviceId,
    videoId: videoData.videoId,
    lang,
  });
  sendResponse({ data });
}

async function sendMessage(
  sendResponse: (res: object) => void,
  func: () => Promise<unknown>
) {
  const data = await func();
  sendResponse({ data });
}

chrome.cookies.get({ url: apiUrl, name: '__Secure-next-auth.session-token' });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.tag) {
    case MESSAGETAG.TAB:
      sendMessage(sendResponse, getTab);
      return true;
    case MESSAGETAG.GETAPI:
      sendMessage(sendResponse, () => getAPI(message.url));
      return true;
    case MESSAGETAG.POSTAPI:
      sendMessage(sendResponse, () => postAPI(message.url, message.body));
      return true;
    case MESSAGETAG.GETFILE:
      getFile(sendResponse, message.fileId);
      return true;
    case MESSAGETAG.UPLOADFILE:
      uploadFile(
        sendResponse,
        message.fileText,
        message.fileName,
        message.url,
        message.lang
      );
      return true;
    default:
      throw new Error('');
  }
});
