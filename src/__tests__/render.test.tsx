import { render } from '@testing-library/react';
import React from 'react';
import App from '../pages/Content/App';

describe('Pages', () => {
  it('renders Content', async () => {
    render(<App />);
  });
});
