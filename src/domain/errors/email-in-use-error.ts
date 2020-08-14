export class EmailInUseError extends Error {
  constructor () {
    super('Email invailds')
    this.name = 'InvaildCredentialsError'
  }
}
