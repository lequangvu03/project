import useQueryParams from './useQueryParams'

function usePaginationParams() {
  const params = useQueryParams()
  return {
    limit: params?.limit || 10,
    page: params?.page || 1
  }
}

export default usePaginationParams
