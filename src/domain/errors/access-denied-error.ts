export class AccessDeniedError extends Error {
  constructor() {
    super('Access negado!');
    this.name = 'AccessDeniedError';
  }
}
