import React from 'react';
import { render } from 'react-dom';
import Controllar from './components/Controllar';
import Modal from './components/Modal';

window.onload = () => {
  const body = document.querySelector('body');
  const container = document.createElement('div');
  container.id = 'react-container';
  container.className = 'bootstrap';

  if (body) {
    body.prepend(container);
  }

  const loadCommentModal = setInterval(() => {
    const commentTitle = document.querySelector(
      'ytd-comments#comments div#header div#title'
    );
    if (commentTitle) {
      const commentTitleSubCloud = document.createElement('div');
      commentTitleSubCloud.id = 'subcloud-comment-title';
      commentTitleSubCloud.className = 'bootstrap';
      commentTitle?.append(commentTitleSubCloud);
      render(<Controllar />, document.querySelector('#subcloud-comment-title'));
      clearInterval(loadCommentModal);
    }
  }, 100);

  render(<Modal />, document.querySelector('#react-container'));
};
