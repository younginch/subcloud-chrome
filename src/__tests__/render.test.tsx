import { render } from '@testing-library/react';
import Controller from '../pages/Content/components/ModalPopover';
import Newtab from '../pages/Newtab/Newtab';
import Options from '../pages/Options/Options';
import Panel from '../pages/Panel/Panel';
import Popup from '../pages/Popup/Popup';
import * as GetTab from '../pages/Content/utils/getTab';

describe('Pages and Components', () => {
  beforeAll(() => {
    jest.spyOn(GetTab, 'default').mockResolvedValue({});
  });

  it('renders controller', async () => {
    jest.spyOn(GetTab, 'default').mockResolvedValue({});

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
});
