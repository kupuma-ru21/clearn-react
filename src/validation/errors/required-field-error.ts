export class RequiredFieldError extends Error {
  constructor () {
    super('Campo obrigat6rio')
    this.name = 'RequireFieldError'
  }
}
