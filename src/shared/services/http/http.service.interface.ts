export interface HttpServiceInterface {
  get<T = any>(url: string): Promise<{ status: number; data: T; timeMs: number }>
}
