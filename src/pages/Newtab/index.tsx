import { createRoot } from 'react-dom/client';

import Newtab from './Newtab';
import './index.css';

const body = document.querySelector('#app-container');

const app = document.createElement('div');
app.id = 'react-root-test';

if (body) {
  body.prepend(app);
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.querySelector('#react-root-test')!).render(<Newtab />);

if (module.hot) module.hot.accept();
