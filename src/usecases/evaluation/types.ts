export type EvaluationUsecaseOutput = {
  tested_endpoints: EndpointResponse
}

export type EndpointResponse = Record<
  string,
  {
    status: number
    time_ms: number
    valid_response: boolean
  }
>

export interface EvaluationUsecaseInterface {
  execute: () => Promise<EvaluationUsecaseOutput>
}
