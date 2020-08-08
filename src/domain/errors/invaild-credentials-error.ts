export class InvaildCredentialsError extends Error {
  constructor () {
    super('Credentials invailds')
    this.name = 'InvaildCredentialsError'
  }
}
