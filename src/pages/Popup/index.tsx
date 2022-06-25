import { createRoot } from 'react-dom/client';

import Popup from './Popup';
import './index.css';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(window.document.querySelector('#app-container')!).render(<Popup />);

if (module.hot) module.hot.accept();
