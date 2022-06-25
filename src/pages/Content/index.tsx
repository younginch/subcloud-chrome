import { ChakraProvider } from '@chakra-ui/react';
import { createRoot } from 'react-dom/client';
import Controller from './components/Controller';
import YoutubeModal from './components/YoutubeModal';

window.onload = () => {
  const loadCommentModal = setInterval(() => {
    const commentTitle = document.querySelector(
      'ytd-comments#comments div#header div#title'
    );
    if (commentTitle) {
      const commentTitleSubCloud = document.createElement('div');
      commentTitleSubCloud.id = 'subcloud-comment-title';
      commentTitle?.append(commentTitleSubCloud);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      createRoot(document.querySelector('#subcloud-comment-title')!).render(
        <ChakraProvider resetCSS={false}>
          <Controller />
        </ChakraProvider>
      );
      clearInterval(loadCommentModal);
    }
  }, 100);
};
