import { Validation } from '@/presentaition/protocols/validation'

export class ValidationStub implements Validation {
  errorMessage: string;
  validate (): string {
    return this.errorMessage
  }
}
