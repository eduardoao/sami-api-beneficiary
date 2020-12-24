import { HttpRequest, HttpResponse } from './ports/http'

export interface iBeneficiaryController {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}