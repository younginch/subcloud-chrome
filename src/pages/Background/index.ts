import { MESSAGETAG } from '../../../utils/type';
import { APIError, Warning } from '../../../utils/error';
import { ToastType } from '../Content/utils/toast';

async function getTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return new Response(JSON.stringify(tab), { status: 200 });
}

async function createTab(url: string) {
  const tab = await chrome.tabs.create({ url });
  return new Response(JSON.stringify(tab), { status: 200 });
}

async function getAPI(url: string) {
  const res = await fetch(`${API_URL}/api/${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
    mode: 'no-cors',
  });
  return res;
}

async function postAPI(url: string, body: object) {
  const res = await fetch(`${API_URL}/api/${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
    body: JSON.stringify(body),
  });
  return res;
}

async function deleteAPI(url: string, body: object) {
  const res = await fetch(`${API_URL}/api/${url}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
    body: JSON.stringify(body),
  });
  return res;
}

async function patchAPI(url: string, body: object) {
  const res = await fetch(`${API_URL}/api/${url}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
    body: JSON.stringify(body),
  });
  return res;
}

async function getFile(sendResponse: (res: object) => void, fileId: string) {
  try {
    const fileRes = await getAPI(`user/file?id=${fileId}`);
    const fileObject = await fileRes.json();
    const rawFile = await fetch(fileObject.url);
    const blobFile = await rawFile.blob();
    const file = new File([blobFile], fileObject.title, {
      type: blobFile.type,
    });
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      sendResponse({ data: String(reader.result), type: 'success' });
    };
  } catch (error: unknown) {
    if (error instanceof APIError) {
      sendResponse({ error: error.message, type: 'apierror' });
    } else if (error instanceof Warning) {
      sendResponse({ error: error.message, type: 'warning' });
    } else if (error instanceof Error) {
      sendResponse({ error: error.message, type: 'error' });
    }
  }
}

async function uploadFile(
  sendResponse: (res: object) => void,
  fileText: string,
  fileName: string,
  url: string,
  lang: string
) {
  try {
    const file = new File([fileText], fileName);
    const formData = new FormData();
    formData.append('file', file);
    const videoRes = await postAPI('user/video', { url });
    const videoData = await videoRes.json();
    const fileResponse = await fetch(`${API_URL}/api/user/file/upload`, {
      method: 'POST',
      body: formData,
    });
    const fileData = await fileResponse.json();
    const data = await postAPI('user/sub', {
      fileId: fileData.id,
      serviceId: videoData.serviceId,
      videoId: videoData.videoId,
      lang,
    });
    sendResponse({ data, type: 'success' });
  } catch (error: unknown) {
    if (error instanceof APIError) {
      sendResponse({ error: error.message, type: 'apierror' });
    } else if (error instanceof Warning) {
      sendResponse({ error: error.message, type: 'warning' });
    } else if (error instanceof Error) {
      sendResponse({ error: error.message, type: 'error' });
    }
  }
}

async function sendToast(
  sendResponse: (res: object) => void,
  tabId: number,
  toastType: ToastType,
  msg: string
) {
  try {
    chrome.tabs.sendMessage(tabId, { tag: MESSAGETAG.TOAST, toastType, msg });
    sendResponse({ data: {}, type: 'success' });
  } catch (error: unknown) {
    if (error instanceof Error)
      sendResponse({ error: error.message, type: 'error' });
  }
}

async function sendReview(
  sendResponse: (res: object) => void,
  tabId: number,
  subId: string,
  time: number
) {
  setTimeout(() => {
    try {
      chrome.tabs.sendMessage(tabId, { tag: MESSAGETAG.REVIEW, subId });
      sendResponse({ data: {}, type: 'success' });
    } catch (error: unknown) {
      if (error instanceof Error)
        sendResponse({ error: error.message, type: 'error' });
    }
  }, time * 1000);
}

async function sendMessage(
  sendResponse: (res: object) => void,
  func: () => Promise<Response>
) {
  try {
    const res = await func();
    if (!res.ok) {
      if (res.status === 409) {
        const data = await res.json();
        sendResponse({ data, type: 'warning' });
      } else {
        throw new APIError(
          `Request failed status code: ${res.status} (request API)`
        );
      }
    } else {
      const data = await res.json();
      sendResponse({ data, type: 'success' });
    }
  } catch (error: unknown) {
    if (error instanceof APIError) {
      sendResponse({ error: error.message, type: 'apierror' });
    } else if (error instanceof Error) {
      sendResponse({ error: error.message, type: 'error' });
    }
  }
}

chrome.cookies.get({ url: API_URL, name: '__Secure-next-auth.session-token' });

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
  const { url } = changeInfo;
  if (url && url.includes('https://www.youtube.com/watch?v=')) {
    await chrome.storage.local.remove(['subtitle']);
    chrome.tabs.sendMessage(tabId, { tag: MESSAGETAG.INIT }, () => {
      const { lastError } = chrome.runtime;
      if (lastError) {
        chrome.tabs.reload(tabId);
      }
      return true;
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.tag) {
    case MESSAGETAG.TAB:
      sendMessage(sendResponse, getTab);
      return true;
    case MESSAGETAG.CREATETAB:
      sendMessage(sendResponse, () => createTab(message.url));
      return true;
    case MESSAGETAG.GETAPI:
      sendMessage(sendResponse, () => getAPI(message.url));
      return true;
    case MESSAGETAG.POSTAPI:
      sendMessage(sendResponse, () => postAPI(message.url, message.body));
      return true;
    case MESSAGETAG.DELETEAPI:
      sendMessage(sendResponse, () => deleteAPI(message.url, message.body));
      return true;
    case MESSAGETAG.PATCHAPI:
      sendMessage(sendResponse, () => patchAPI(message.url, message.body));
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
    case MESSAGETAG.TOAST:
      sendToast(sendResponse, message.tabId, message.toastType, message.msg);
      return true;
    case MESSAGETAG.REVIEW:
      sendReview(sendResponse, message.tabId, message.subId, message.time);
      return true;
    default:
      throw new Error('');
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.windows.getAll(
    {
      populate: true,
    },
    (windows) => {
      for (let i = 0; i < windows.length; i += 1) {
        const currentWindow = windows[i];
        const t = currentWindow.tabs;
        if (t)
          for (let j = 0; j < t.length; j += 1) {
            const { id, url } = t[j];
            if (id && url?.includes('https://www.youtube.com/'))
              chrome.tabs.reload(id);
          }
      }
    }
  );
});

chrome.runtime.onInstalled.addListener((e) => {
  if (e.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.tabs.create({
      url: `${API_URL}/auth/signin`,
    });
  }
});

if (chrome.runtime.setUninstallURL) {
  chrome.runtime.setUninstallURL(`${API_URL}/uninstall`);
}
