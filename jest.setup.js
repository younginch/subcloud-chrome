Object.defineProperty(global, 'API_URL', {
  value: 'localhost:3000',
  writable: false,
});

global.chrome = {
  storage: {
    local: {
      get: jest.fn(),
      set: jest.fn(),
    },
  },
  runtime: {
    getURL: jest.fn(),
    sendMessage: jest.fn(),
    onMessage: { addListener: jest.fn(), removeListener: jest.fn() },
  },
  tabs: { create: jest.fn() },
  i18n: {
    getMessage: () => 'hello',
  },
  cookies: {
    get: jest.fn(),
  },
};
