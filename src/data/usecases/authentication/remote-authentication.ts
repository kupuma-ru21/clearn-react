import { HttpPostClient } from '@/data/protocols/http/http-post-client'
import { AuthenticationParams } from '@/domain/usecases/authentication'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { InvaildCredentialsError } from '@/domain/errors/invaild-credentials-error'
import { UnexpectedError } from '@/domain/errors/unexpected-error'

export class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async auth (params: AuthenticationParams): Promise<void> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        break
      case HttpStatusCode.unauthorized:
        throw new InvaildCredentialsError()
      default:
        throw new UnexpectedError()
    }
  }
}
