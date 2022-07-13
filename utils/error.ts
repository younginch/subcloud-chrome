// eslint-disable-next-line max-classes-per-file
class APIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'apierror';
  }
}

class Warning extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'warning';
  }
}

export { APIError, Warning };
