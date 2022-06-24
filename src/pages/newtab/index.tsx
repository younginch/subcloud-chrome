import React from 'react';
import { render } from 'react-dom';

import Newtab from './newtab';
import './index.css';

const body = document.querySelector('#app-container');

const app = document.createElement('div');
app.id = 'react-root-test';

if (body) {
  body.prepend(app);
}

render(<Newtab />, document.querySelector('#react-root-test'));

if (module.hot) module.hot.accept();
