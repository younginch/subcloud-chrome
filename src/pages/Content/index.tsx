import { ChakraProvider } from '@chakra-ui/react';
import { createRoot } from 'react-dom/client';
import Controller from './components/Controller';
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
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      createRoot(document.querySelector('#subcloud-comment-title')!).render(
        <Controller />
      );
      clearInterval(loadCommentModal);
    }
  }, 100);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  createRoot(document.querySelector('#react-container')!).render(
    <ChakraProvider resetCSS={false}>
      <Modal />
    </ChakraProvider>
  );
};
