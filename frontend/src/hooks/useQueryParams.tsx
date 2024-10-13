import { useSearchParams } from 'next/navigation'

function useQueryParams() {
  const params = useSearchParams()
  const paramsObject = Object.fromEntries([...params])
  return paramsObject
}

export default useQueryParams
