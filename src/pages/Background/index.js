const apiUrl = 'http://localhost:3000'; // 'https://subcloud.app'; //

async function getTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

async function getAPI(url) {
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

async function postAPI(url, body) {
  const res = await fetch(`${apiUrl}/api/${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
    body,
  });
  const data = await res.json();
  return data;
}

async function getFile(sendResponse, fileId) {
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

async function uploadFile(sendResponse, fileText, fileName, url, lang) {
  const file = new File([fileText], fileName);
  const formData = new FormData();
  formData.append('file', file);
  const videoData = await postAPI('video', JSON.stringify({ url }));
  const fileResponse = await fetch(`${apiUrl}/api/file/upload`, {
    method: 'POST',
    body: formData,
  });
  const fileData = await fileResponse.json();
  const data = await postAPI(
    'sub',
    JSON.stringify({
      fileId: fileData.id,
      serviceId: videoData.serviceId,
      videoId: videoData.videoId,
      lang,
    })
  );
  sendResponse({ data });
}

async function sendMessage(sendResponse, func) {
  const data = await func();
  sendResponse({ data });
}

chrome.cookies.get({ url: apiUrl, name: '__Secure-next-auth.session-token' });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.tag === 'get-tab') {
    sendMessage(sendResponse, getTab);
  } else if (message.tag === 'api') {
    if (message.type === 'get')
      sendMessage(sendResponse, () => getAPI(message.url));
    else if (message.type === 'post')
      sendMessage(sendResponse, () =>
        postAPI(message.url, JSON.stringify(message.body))
      );
  } else if (message.tag === 'getFile') {
    getFile(sendResponse, message.fileId);
  } else if (message.tag === 'uploadFile') {
    uploadFile(
      sendResponse,
      message.fileText,
      message.fileName,
      message.url,
      message.lang
    );
  }
  return true;
});
