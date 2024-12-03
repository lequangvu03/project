import { OrderStatus } from '~/definitions/constant/types.constant'

export function formatOrderStatus(status: OrderStatus): string {
  switch (status) {
    case OrderStatus.Pending:
      return 'Pending'
    case OrderStatus.Completed:
      return 'Completed'
    case OrderStatus.Cancelled:
      return 'Cancelled'
    default:
      throw new Error(`Invalid status value: ${status}`) // Handle invalid values
  }
}
