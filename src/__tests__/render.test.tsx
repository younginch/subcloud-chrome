import { render } from '@testing-library/react';
import { Box, ChakraProvider, extendTheme, Table } from '@chakra-ui/react';
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';
import React from 'react';
import Newtab from '../pages/Newtab/Newtab';
import Options from '../pages/Options/Options';
import Panel from '../pages/Panel/Panel';
import Popup from '../pages/Popup/Popup';
import * as Fetch from '../pages/Content/utils/fetch';
import * as sendMessage from '../pages/Content/utils/sendMessage';
import BottomButton from '../pages/Content/components/bottomButton';
import CSSResetCustom from '../pages/Content/components/cssResetCustom';
import SubtitleComponent from '../pages/Content/components/subtitleComponent';
import RequestButton from '../pages/Content/components/requestButton';
import calculateLayout from '../pages/Content/helpers/calculateLayout';
import QuickSubtitleRequest from '../pages/Content/components/quickSubtitleRequest';
import DropZone from '../pages/Content/components/dropZone';
import Setting from '../pages/Content/tabs/setting';
import GreetingComponent from '../containers/Greetings/Greetings';
import * as sub from '../pages/Content/utils/api/sub';
import request from '../pages/Content/utils/api/request';
import * as video from '../pages/Content/utils/api/video';
import uploadFile from '../pages/Content/utils/api/uploadFile';
import requestCount from '../pages/Content/utils/api/requestCount';
import HomeNoSub from '../pages/Content/tabs/homeNoSub';
import Upload from '../pages/Content/tabs/upload';
import {
  AppreciationIcon,
  AppreciationSVG,
} from '../pages/Content/components/icons';
import CheckSubtitle from '../pages/Content/tabs/upload/checkSubtitle';
import UploadSubtitle from '../pages/Content/tabs/upload/uploadSubtitle';
import UploadFinish from '../pages/Content/tabs/upload/uploadFinish';
import RatingComponent from '../pages/Content/components/rateComponent';
import SelectLang from '../pages/Content/components/selectLang';
import ColorPicker from '../pages/Content/components/colorPicker';
import TableRow from '../pages/Content/components/tableRow';
import { Status } from '../../utils/type';
import getSubs from '../pages/Content/utils/api/getSubs';
import Subtitle from '../pages/Content/tabs/subtitle';
import ToastComponent from '../pages/Content/components/toastComponent';
import SettingRow from '../pages/Content/components/settingRow';
import { CustomCard } from '../pages/Content/components/customCard';
import {
  closeMainModal,
  toggleMainModal,
} from '../pages/Content/helpers/modalControl';
import Layout from '../pages/Content/components/layout';
import MainModal from '../pages/Content/components/mainModal';
import Notify from '../pages/Content/tabs/notify';
import NotifyCard from '../pages/Content/components/notifyCard';
import { NotifyType } from '../pages/Content/utils/notify';
import HomeLoginFirst from '../pages/Content/tabs/homeLoginFirst';
import * as notice from '../pages/Content/utils/api/notice';
import * as getFile from '../pages/Content/utils/api/getFile';
import subView from '../pages/Content/utils/api/subView';
import LoginFirst from '../pages/Popup/components/loginFirst';
import ReviewComponent from '../pages/Content/components/reviewComponent';
import createTab from '../pages/Content/utils/createTab';

describe('Pages and Components', () => {
  beforeAll(() => {
    jest.spyOn(sendMessage, 'default').mockResolvedValue({ data: 1 });
  });

  it('renders QuickSubtitleRequest', async () => {
    render(<QuickSubtitleRequest />);
  });

  it('renders Newtab', async () => {
    render(<Newtab />);
  });

  it('renders Options', async () => {
    render(<Options title="" />);
  });

  it('renders Panel', async () => {
    render(<Panel />);
  });

  it('render ToastComponent', async () => {
    render(<ToastComponent />);
  });

  it('render BottomButton', async () => {
    jest.spyOn(notice, 'getNotices').mockImplementationOnce(async () => []);
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f) => f());
    jest.spyOn(chrome.storage.local, 'get').mockImplementationOnce((key, cb) =>
      cb({
        onOff: true,
      })
    );
    render(
      <ChakraProvider>
        <BottomButton />
      </ChakraProvider>
    );
  });

  it('render Layout', async () => {
    jest.spyOn(notice, 'getNotices').mockImplementationOnce(async () => [
      {
        notice: {
          type: NotifyType.ANNOUNCE,
          message: '',
          url: '',
          createdAt: Date(),
        },
        id: '',
        checked: true,
      },
    ]);
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f) => f());
    render(
      <ChakraProvider>
        <Layout />
      </ChakraProvider>
    );
  });

  it('render MainModal', async () => {
    render(
      <ChakraProvider>
        <MainModal />
      </ChakraProvider>
    );
  });

  it('render CSSResetCustom', async () => {
    render(<CSSResetCustom />);
  });

  it('render ReviewComponent', async () => {
    jest
      .spyOn(document, 'getElementById')
      .mockImplementation(
        () => ({ remove: jest.fn() } as unknown as HTMLElement)
      );
    render(<ReviewComponent duration={6000} subId="" />);
  });

  it('render SubtitleComponent', async () => {
    render(<SubtitleComponent />);
  });

  it('render RequestButton', async () => {
    render(<RequestButton />);
  });

  it('render DropZone', async () => {
    render(
      <DropZone setFiles={(file: File[]) => null} uploadCallback={() => null} />
    );
  });

  it('render TableRow', async () => {
    render(
      <ChakraProvider>
        <Table>
          <TableRow
            lang="en"
            rating={0}
            viewCount={0}
            status={Status.Pending}
            madeBy="MyeongJin Shin"
            onClick={() => null}
          />
        </Table>
      </ChakraProvider>
    );
  });

  it('render Greetings', async () => {
    render(<GreetingComponent />);
  });

  it('render HomeNoSub tab', async () => {
    render(
      <ChakraProvider>
        <HomeNoSub
          videoData={{
            url: '',
            serviceId: '',
            videoId: '',
            youtubeVideoId: '',
          }}
        />
      </ChakraProvider>
    );
  });

  it('render HomeLoginFirst tab', async () => {
    render(
      <ChakraProvider>
        <HomeLoginFirst />
      </ChakraProvider>
    );
  });

  it('render Setting tab', async () => {
    const user = {
      id: '',
      name: 'c',
      email: 'c@df.com',
      image: 'casdf',
      point: 0,
    };
    jest.spyOn(chrome.storage.local, 'get').mockImplementationOnce((key, cb) =>
      cb({
        isBorder: undefined,
        isBackGround: undefined,
        sliderValue: undefined,
        fontColor: undefined,
        fontBorderColor: undefined,
        fontBgColor: undefined,
      })
    );
    jest.spyOn(chrome.storage.local, 'get').mockImplementationOnce(jest.fn());
    render(
      <ChakraProvider>
        <Setting user={user} />
      </ChakraProvider>
    );
  });

  it('render SettingRow', async () => {
    render(
      <ChakraProvider>
        <SettingRow name="test" />
      </ChakraProvider>
    );
  });

  it('render CustomCard', async () => {
    render(
      <ChakraProvider>
        <CustomCard>
          <Box />
        </CustomCard>
      </ChakraProvider>
    );
  });

  it('render Subtitle tab', async () => {
    const date = new Date();
    render(
      <ChakraProvider>
        <Subtitle
          subs={[
            {
              id: '',
              lang: '',
              rating: 0,
              views: 0,
              userName: '',
              uploadDate: date,
            },
          ]}
        />
      </ChakraProvider>
    );
  });

  it('render RateComponent', async () => {
    render(<RatingComponent size="15px" rating={4.3} />);
  });

  it('render AppereciateIcon', async () => {
    render(
      <ChakraProvider>
        <AppreciationIcon size={15} />
      </ChakraProvider>
    );
  });

  it('render AppereciateSVG', async () => {
    render(
      <ChakraProvider>
        <AppreciationSVG />
      </ChakraProvider>
    );
  });

  it('render SelectLang', async () => {
    render(
      <ChakraProvider>
        <SelectLang
          height="130px"
          width="30px"
          lang="en"
          clickEvent={() => null}
        />
      </ChakraProvider>
    );
  });

  it('render ColorPicker', async () => {
    render(
      <ChakraProvider>
        <ColorPicker
          color={{ r: 0, g: 0, b: 0 }}
          label="debug"
          changeFunction={() => null}
          activate
        />
      </ChakraProvider>
    );
  });

  it('render Upload tab', async () => {
    const theme = extendTheme({
      components: {
        Steps,
      },
    });
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
    render(
      <ChakraProvider theme={theme}>
        <Upload />
      </ChakraProvider>
    );
  });

  it('render UploadSubtitle', async () => {
    render(
      <ChakraProvider>
        <UploadSubtitle setFiles={() => null} uploadCallback={() => null} />
      </ChakraProvider>
    );
  });

  it('render CheckSubtitle', async () => {
    render(
      <ChakraProvider>
        <CheckSubtitle
          files={[]}
          setFiles={() => null}
          sendCallback={() => null}
        />
      </ChakraProvider>
    );
  });

  it('render UploadFinish', async () => {
    render(
      <ChakraProvider>
        <UploadFinish />
      </ChakraProvider>
    );
  });

  it('render Notify', async () => {
    render(
      <ChakraProvider>
        <Notify
          readNotifications={[
            {
              id: '',
              notifyType: NotifyType.ANNOUNCE,
              title: '',
              time: '',
              content: '',
              href: '',
            },
          ]}
          unreadNotifications={[
            {
              id: '',
              notifyType: NotifyType.ANNOUNCE,
              title: '',
              time: '',
              content: '',
              href: '',
            },
          ]}
          setReadNotifications={() => null}
          setUnreadNotifications={() => null}
        />
      </ChakraProvider>
    );
  });

  it('render NotifyCard ANNOUNCE', async () => {
    render(
      <ChakraProvider>
        <NotifyCard
          notifyType={NotifyType.ANNOUNCE}
          title="hello"
          time="world"
          content="content"
          href="google.com"
          onRemove={jest.fn()}
          id="hello"
        />
      </ChakraProvider>
    );
  });

  it('render NotifyCard NEW_SUBTITLE', async () => {
    render(
      <ChakraProvider>
        <NotifyCard
          notifyType={NotifyType.NEW_SUBTITLE}
          title="hello"
          time="world"
          content="content"
          href="google.com"
          onRemove={jest.fn()}
          id="hello"
        />
      </ChakraProvider>
    );
  });

  it('render NotifyCard REVIEW', async () => {
    render(
      <ChakraProvider>
        <NotifyCard
          notifyType={NotifyType.REVIEW}
          title="hello"
          time="world"
          content="content"
          href="google.com"
          onRemove={jest.fn()}
          id="hello"
        />
      </ChakraProvider>
    );
  });

  it('render NotifyCard DEFAULT', async () => {
    render(
      <ChakraProvider>
        <NotifyCard
          notifyType={'bug' as NotifyType}
          title="hello"
          time="world"
          content="content"
          href="google.com"
          onRemove={jest.fn()}
          id="hello"
        />
      </ChakraProvider>
    );
  });

  it('render Popup', async () => {
    jest.spyOn(chrome.tabs, 'create').mockImplementation(jest.fn());
    render(
      <ChakraProvider>
        <Popup />
      </ChakraProvider>
    );
  });

  it('render LoginFirst', async () => {
    jest.spyOn(chrome.tabs, 'create').mockImplementation(jest.fn());
    render(
      <ChakraProvider>
        <LoginFirst />
      </ChakraProvider>
    );
  });

  it('test closeMainModal success', () => {
    jest
      .spyOn(document, 'getElementById')
      .mockImplementation(
        () => ({ classList: { remove: jest.fn() } } as unknown as HTMLElement)
      );
    const removeResult = closeMainModal();
    expect(removeResult).toBeTruthy();
  });

  it('test closeMainModal fail', () => {
    jest.spyOn(document, 'getElementById').mockImplementation(() => null);
    const removeResult = closeMainModal();
    expect(removeResult).toBeFalsy();
  });

  it('test toggleMainModal close', () => {
    jest.spyOn(document, 'getElementById').mockImplementation(
      () =>
        ({
          classList: { contains: () => true, remove: jest.fn() },
        } as unknown as HTMLElement)
    );
    const removeResult = toggleMainModal();
    expect(removeResult).toBeTruthy();
  });

  it('test toggleMainModal open', () => {
    jest.spyOn(document, 'getElementById').mockImplementation(
      () =>
        ({
          classList: { contains: () => false, add: jest.fn() },
        } as unknown as HTMLElement)
    );
    const removeResult = toggleMainModal();
    expect(removeResult).toBeTruthy();
  });

  it('test toggleMainModal fail', () => {
    jest.spyOn(document, 'getElementById').mockImplementation(() => null);
    const toggleResult = toggleMainModal();
    expect(toggleResult).toBeFalsy();
  });

  it('test calculateLayout returns undefined', () => {
    const subtitleInfo = calculateLayout(60);
    expect(subtitleInfo).toBe(undefined);
  });

  it('test calculateLayout returns infomation', () => {
    jest
      .spyOn(document, 'querySelector')
      .mockImplementation(() => ({ offsetHeight: 60 } as HTMLElement));
    jest
      .spyOn(document, 'querySelectorAll')
      .mockImplementation(
        () =>
          [
            { offsetHeight: 60, offsetWidth: 60, closest: () => null },
          ] as unknown as NodeListOf<HTMLVideoElement>
      );
    const subtitleInfo = calculateLayout(60);
    expect(subtitleInfo).toBeDefined();
    if (subtitleInfo) {
      expect(subtitleInfo[0]).toBeCloseTo(1.44);
      expect(subtitleInfo[1]).toBeCloseTo(51.48);
    }
  });

  it('test sendMessage returns infomation', async () => {
    jest
      .spyOn(chrome.runtime, 'sendMessage')
      .mockImplementation(async () => ({ data: 1 }));
    const msg = await sendMessage.default({});
    expect(msg).toBeDefined();
    if (msg) {
      expect(msg.data).toBeCloseTo(1);
    }
  });

  it('test createTab returns infomation', async () => {
    const msg = await createTab('');
    expect(msg).toBeDefined();
  });

  it('test getSubs returns infomation', async () => {
    const date = new Date();
    jest.spyOn(Fetch, 'getFetch').mockImplementation(async () => [
      {
        status: 'Approved',
        id: '',
        lang: '',
        ratings: [],
        views: 0,
        user: { name: '' },
        updateAt: date,
      },
    ]);
    const msg = await getSubs('', '');
    expect(msg).toBeDefined();
  });

  it('test sub returns infomation', async () => {
    jest.spyOn(Fetch, 'getFetch').mockImplementation(async () => '');
    const msg = await sub.default('1');
    expect(msg).toBeDefined();
  });

  it('test request returns infomation', async () => {
    jest
      .spyOn(video, 'default')
      .mockImplementation(async () => ({ serviceId: 1, videoId: 1 }));
    jest
      .spyOn(Fetch, 'postFetch')
      .mockImplementation(async () => ({ data: '' }));
    const msg = await request('', '', 'en', 0);
    expect(msg).toBeUndefined();
  });

  it('test uploadFile returns infomation', async () => {
    jest.spyOn(sendMessage, 'default').mockImplementation(async () => '');
    const msg = await uploadFile('', '', '', '');
    expect(msg).toBeDefined();
  });

  it('test requestCount returns infomation', async () => {
    jest
      .spyOn(video, 'default')
      .mockImplementation(async () => ({ serviceId: 1, videoId: 1 }));
    jest.spyOn(Fetch, 'getFetch').mockImplementation(async () => '');
    const msg = await requestCount('', '');
    expect(msg).toBeDefined();
    if (msg) {
      expect(msg.data).toBeCloseTo(0);
    }
  });

  it('test requestCount returns infomation', async () => {
    jest
      .spyOn(video, 'default')
      .mockImplementation(async () => ({ serviceId: 1, videoId: 1 }));
    jest
      .spyOn(Fetch, 'getFetch')
      .mockImplementation(async () => [{ _count: { users: 0 } }]);
    const msg = await requestCount('', '');
    expect(msg).toBeDefined();
    if (msg) {
      expect(msg.data).toBeCloseTo(0);
    }
  });

  it('test changeFetch returns infomation', async () => {
    jest
      .spyOn(sendMessage, 'default')
      .mockImplementation(async () => ({ data: 1 }));
    const msg = await Fetch.patchFetch('', {});
    expect(msg).toBeDefined();
  });

  it('test changeNotices returns infomation', async () => {
    jest.spyOn(Fetch, 'patchFetch').mockImplementation(async () => '1');
    const msg = await notice.changeNotices('');
    expect(msg).toBeDefined();
  });

  it('test deleteFetch returns infomation', async () => {
    jest
      .spyOn(sendMessage, 'default')
      .mockImplementation(async () => ({ data: 1 }));
    const msg = await Fetch.deleteFetch('', {});
    expect(msg).toBeDefined();
  });

  it('test deleteNotices returns infomation', async () => {
    jest.spyOn(Fetch, 'deleteFetch').mockImplementation(async () => '1');
    const msg = await notice.deleteNotices('');
    expect(msg).toBeDefined();
  });

  it('test getFile returns infomation', async () => {
    jest.spyOn(sub, 'default').mockImplementation(async () => ({ fileId: '' }));
    jest.spyOn(sendMessage, 'default').mockImplementation(async () => ({
      data: `
      1
      00:00:20,454 --> 00:00:23,130 
      If I were your man, which I'm clearly not now
      `,
    }));
    const msg = await getFile.default('');
    expect(msg).toBeDefined();
  });

  it('test subView returns infomation', async () => {
    // jest.spyOn(Fetch, 'postFetch').mockImplementation(async () => '');
    const msg = await subView('');
    expect(msg).toBeDefined();
  });
  /*

  it('test componentLoader append', () => {
    jest
      .spyOn(document, 'querySelector')
      .mockImplementation(
        () =>
          ({ append: () => null, remove: () => null } as unknown as HTMLElement)
      );
    jest
      .spyOn(document, 'createElement')
      .mockImplementation(() => ({ id: 'beforeId' } as any));
    const appendResult = componentLoader({
      parentQuery: 'parent',
      targetId: 'target',
      children: <Box />,
      attachType: AttachType.APPEND,
    });
    expect(appendResult).toBeTruthy();
  });

  it('test componentLoader prepend', () => {
    jest.spyOn(document, 'querySelector').mockImplementation(
      () =>
        ({
          prepend: () => null,
          remove: () => null,
        } as unknown as HTMLElement)
    );
    jest
      .spyOn(document, 'createElement')
      .mockImplementation(() => ({ id: 'beforeId' } as HTMLElement));


    jest.mock('react-dom/client', () => ({
      createRoot: () => ({ render: jest.fn() }),
    }));
    
    const appendResult = componentLoader({
      parentQuery: 'parent',
      targetId: 'target',
      children: <Box />,
      attachType: AttachType.PREPEND,
    });
    expect(appendResult).toBeTruthy();
  });
  */
});
