import { render } from '@testing-library/react';
import App from '../pages/Content/App';
import Controller from '../pages/Content/components/Controller';
import Modal from '../pages/Content/components/Modal';
import Newtab from '../pages/Newtab/Newtab';
import Options from '../pages/Options/Options';
import Panel from '../pages/Panel/Panel';
import Popup from '../pages/Popup/Popup';

describe('Pages and Components', () => {
  it('renders controller', async () => {
    render(<Controller />);
  });

  it('renders Modal', async () => {
    render(<Modal />);
  });

  it('renders Content', async () => {
    render(<App />);
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
