import { RoleType } from '~/definitions/constant/types.constant'

export function formatRole(role: RoleType): string {
  switch (role) {
    case RoleType.Admin:
      return 'Admin'
    case RoleType.Employee:
      return 'Employee'
    default:
      throw new Error(`Invalid role value: ${role}`) // Xử lý giá trị không hợp lệ
  }
}
