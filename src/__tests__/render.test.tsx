import { render } from '@testing-library/react';
import React from 'react';
import App from '../pages/content/App';
import Newtab from '../pages/newtab/Newtab';
import Options from '../pages/options/Options';
import Panel from '../pages/panel/Panel';

describe('Pages', () => {
  it('renders Content', async () => {
    render(<App />);
  });

  it('renders Options', async () => {
    render(<Options title="" />);
  });

  it('renders Panel', async () => {
    render(<Panel />);
  });

  it('renders Popup', async () => {
    render(<Newtab />);
  });
});
