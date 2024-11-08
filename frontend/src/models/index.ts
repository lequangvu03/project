export interface APISuccessResponse<T> {
  message: string
  result: T
}

export type IBaseQueryParams = {
  enabled?: boolean
  refetchInterval?: number
}
