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
  runtime: { getURL: jest.fn(), sendMessage: jest.fn() },
  tabs: { create: jest.fn() },
};
