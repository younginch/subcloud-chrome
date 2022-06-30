import { render } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import Newtab from '../pages/Newtab/Newtab';
import Options from '../pages/Options/Options';
import Panel from '../pages/Panel/Panel';
import Popup from '../pages/Popup/Popup';
import * as GetTab from '../pages/Content/utils/getTab';
import * as Fetch from '../pages/Content/utils/fetch';
import * as sendMessage from '../pages/Content/utils/sendMessage';
import BottomButton from '../pages/Content/components/BottomButton';
import CSSResetCustom from '../pages/Content/cssResetCustom';
import SubtitleComponent from '../pages/Content/components/SubtitleComponent';
import RequestButton from '../pages/Content/components/RequestButton';
import calculateLayout from '../pages/Content/helpers/calculateLayout';
import QuickSubtitleRequest from '../pages/Content/components/QuickSubtitleRequest';
import DropZone from '../pages/Content/components/DropZone';
import Home from '../pages/Content/tabs/Home';
import Setting from '../pages/Content/tabs/Setting';
import Subtitle from '../pages/Content/tabs/Subtitle';
import GreetingComponent from '../containers/Greetings/Greetings';
import * as sub from '../pages/Content/utils/api/sub';
import request from '../pages/Content/utils/api/request';
import * as video from '../pages/Content/utils/api/video';
import uploadFile from '../pages/Content/utils/api/uploadFile';
import requestCount from '../pages/Content/utils/api/requestCount';
import HomeNoSub from '../pages/Content/tabs/HomeNoSub';
import UploadDeprecated from '../pages/Content/tabs/UploadDeprecated';

describe('Pages and Components', () => {
  beforeAll(() => {
    jest.spyOn(GetTab, 'default').mockResolvedValue({});
    jest.spyOn(Fetch, 'getFetch').mockResolvedValue({});
    jest.spyOn(Fetch, 'postFetch').mockResolvedValue({});
  });

  it('renders QuickSubtitleRequest', async () => {
    jest.spyOn(Fetch, 'getFetch').mockResolvedValue({});
    jest.spyOn(Fetch, 'postFetch').mockResolvedValue({});

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

  it('renders Popup', async () => {
    render(<Popup />);
  });

  it('render BottomButton', async () => {
    render(<BottomButton />);
  });

  it('render CSSResetCustom', async () => {
    render(<CSSResetCustom />);
  });

  it('render SubtitleComponent', async () => {
    render(<SubtitleComponent />);
  });

  it('render RequestButton', async () => {
    render(<RequestButton />);
  });

  it('render DropZone', async () => {
    render(<DropZone setFiles={(file: File[]) => null} />);
  });

  it('render Greetings', async () => {
    render(<GreetingComponent />);
  });

  it('render Home-deprecated tab', async () => {
    render(
      <ChakraProvider>
        <Home />
      </ChakraProvider>
    );
  });

  it('render HomeNoSub tab', async () => {
    render(
      <ChakraProvider>
        <HomeNoSub />
      </ChakraProvider>
    );
  });

  it('render Setting tab', async () => {
    render(
      <ChakraProvider>
        <Setting />
      </ChakraProvider>
    );
  });

  it('render Subtitle tab', async () => {
    render(
      <ChakraProvider>
        <Subtitle />
      </ChakraProvider>
    );
  });

  it('render UploadDeprecated tab', async () => {
    render(
      <ChakraProvider>
        <UploadDeprecated />
      </ChakraProvider>
    );
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
    const msg = await request('', '', 0);
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
    const msg = await requestCount('');
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
    const msg = await requestCount('');
    expect(msg).toBeDefined();
    if (msg) {
      expect(msg.data).toBeCloseTo(0);
    }
  });

  /*
  it('test sendMessage returns infomation', async () => {
    jest
      .spyOn(chrome.runtime, 'sendMessage')
      .mockImplementation(async () => "");
    const msg = await CurrentTab();
    expect(msg).toBeDefined();
    if (msg) {
      expect(msg.data).toBeInstanceOf(String);
    }
  });
  */

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
