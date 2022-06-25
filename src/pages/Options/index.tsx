import { createRoot } from 'react-dom/client';

import Options from './Options';
import './index.css';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(window.document.querySelector('#app-container')!).render(
  <Options title="Settings" />
);

if (module.hot) module.hot.accept();
