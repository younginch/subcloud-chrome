import React from 'react';
import { render } from 'react-dom';

import Popup from './popup';
import './index.css';

render(<Popup />, window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();
