import { render } from '@testing-library/react';
import React from 'react';
import App from '../pages/content/App';
import Newtab from '../pages/newtab/Newtab';

describe('Pages', () => {
  it('renders Content', async () => {
    render(<App />);
  });

  it('renders Popup', async () => {
    render(<Newtab />);
  });
});
