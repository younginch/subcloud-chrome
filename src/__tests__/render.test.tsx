import { render } from '@testing-library/react';
import App from '../pages/Content/App';
import Newtab from '../pages/Newtab/Newtab';

describe('Pages', () => {
  it('renders Content', async () => {
    render(<App />);
  });

  it('renders Popup', async () => {
    render(<Newtab />);
  });
});
