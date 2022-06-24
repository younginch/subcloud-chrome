import { render } from '@testing-library/react';
import React from 'react';
import App from '../pages/content/app';
import Newtab from '../pages/newtab/newtab';

describe('Pages', () => {
  it('renders Content', async () => {
    render(<App />);
  });

  it('renders Popup', async () => {
    render(<Newtab />);
  });
});
