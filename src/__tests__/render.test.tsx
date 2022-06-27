import { render } from '@testing-library/react';
import Controller from '../pages/Content/components/ModalPopover';
import Newtab from '../pages/Newtab/Newtab';
import Options from '../pages/Options/Options';
import Panel from '../pages/Panel/Panel';
import Popup from '../pages/Popup/Popup';
import * as GetTab from '../pages/Content/utils/getTab';
import * as Fetch from '../pages/Content/utils/fetch';
import BottomButton from '../pages/Content/components/BottomButton';
import CSSResetCustom from '../pages/Content/cssResetCustom';

describe('Pages and Components', () => {
  beforeAll(() => {
    jest.spyOn(GetTab, 'default').mockResolvedValue({});
    jest.spyOn(Fetch, 'getFetch').mockResolvedValue({});
    jest.spyOn(Fetch, 'postFetch').mockResolvedValue({});
  });

  it('renders controller', async () => {
    jest.spyOn(GetTab, 'default').mockResolvedValue({});
    jest.spyOn(Fetch, 'getFetch').mockResolvedValue({});
    jest.spyOn(Fetch, 'postFetch').mockResolvedValue({});

    render(<Controller />);
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
});
