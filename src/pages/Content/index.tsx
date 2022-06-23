import React from 'react';
import { render } from 'react-dom';
import App from './App';

console.log('Content script works!');

window.onload = () => {
  const body = document.querySelector('body');
  const container = document.createElement('div');
  container.id = 'react-container';

  if (body) {
    body.prepend(container);
  }

  const app = document.createElement('div');
  app.id = 'react-root';
  if (container) {
    container.prepend(app);
  }

  render(<App />, document.querySelector('#react-root'));
};
