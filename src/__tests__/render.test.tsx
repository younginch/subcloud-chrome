import { render } from '@testing-library/react';
import { ChakraProvider, Popover } from '@chakra-ui/react';
import Newtab from '../pages/Newtab/Newtab';
import Options from '../pages/Options/Options';
import Panel from '../pages/Panel/Panel';
import Popup from '../pages/Popup/Popup';
import * as GetTab from '../pages/Content/utils/getTab';
import * as Fetch from '../pages/Content/utils/fetch';
import BottomButton from '../pages/Content/components/BottomButton';
import CSSResetCustom from '../pages/Content/cssResetCustom';
import SubtitleComponent from '../pages/Content/components/SubtitleComponent';
import RequestButton from '../pages/Content/components/RequestButton';
import calculateLayout from '../pages/Content/helpers/calculateLayout';
import YoutubeModal from '../pages/Content/components/YoutubeModal';
import QuickSubtitleRequest from '../pages/Content/components/QuickSubtitleRequest';

describe('Pages and Components', () => {
  beforeAll(() => {
    jest.spyOn(GetTab, 'default').mockResolvedValue({});
    jest.spyOn(Fetch, 'getFetch').mockResolvedValue({});
    jest.spyOn(Fetch, 'postFetch').mockResolvedValue({});
  });

  it('renders QuickSubtitleRequest', async () => {
    jest.spyOn(GetTab, 'default').mockResolvedValue({});
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

  it('render YoutubeModal', async () => {
    render(
      <ChakraProvider>
        <Popover>
          <YoutubeModal />
        </Popover>
      </ChakraProvider>
    );
  });

  it('test calculateLayout returns undefined', () => {
    const subtitleInfo = calculateLayout(60);
    expect(subtitleInfo).toBe(undefined);
  });

  it('test calculateLayout returns infomation', () => {
    // eslint-disable-next-line arrow-body-style
    jest.spyOn(document, 'querySelector').mockImplementation(() => {
      return { offsetHeight: 60 } as HTMLElement;
    });
    // eslint-disable-next-line arrow-body-style
    jest.spyOn(document, 'querySelectorAll').mockImplementation(() => {
      return [
        { offsetHeight: 60, offsetWidth: 60, closest: () => null },
      ] as unknown as NodeListOf<HTMLVideoElement>;
    });
    const subtitleInfo = calculateLayout(60);
    expect(subtitleInfo).toBeDefined();
    if (subtitleInfo) {
      expect(subtitleInfo[0]).toBeCloseTo(1.44);
      expect(subtitleInfo[1]).toBeCloseTo(51.48);
    }
  });
});
