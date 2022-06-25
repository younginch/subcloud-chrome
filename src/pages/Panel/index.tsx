import { createRoot } from 'react-dom/client';
import Panel from './Panel';
import './index.css';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(window.document.querySelector('#app-container')!).render(<Panel />);

if (module.hot) module.hot.accept();
