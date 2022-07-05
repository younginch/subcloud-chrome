Object.assign(global, require('jest-chrome'));
Object.defineProperty(global, 'API_URL', {
  value: 'localhost:3000',
  writable: false,
});
