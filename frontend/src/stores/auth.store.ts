import { create } from 'zustand'
import { PermissionType, RoleType } from '~/definitions/constant/types.constant'
type AuthState = {
  role?: RoleType
  permissions: PermissionType[]
  email: string
  avatar: string
  name: string
  updateAuthStore: (data: { permissions?: PermissionType[]; role?: RoleType; email?: string; avatar?: string }) => void
}

const useAuthStore = create<AuthState>((set) => ({
  permissions: [],
  email: '',
  avatar: '',
  name: '',
  updateAuthStore: (data) =>
    set({
      permissions: data.permissions,
      role: data.role,
      avatar: data.avatar,
      email: data.email
    })
}))

export default useAuthStore
