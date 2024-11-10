/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSession } from 'next-auth/react'
import { RoleType } from '~/definitions/constant/types.constant'

function usePermissions() {
  const { data } = useSession()
  return {
    isAdmin: (data as any)?.role === RoleType.Admin
  }
}

export default usePermissions
