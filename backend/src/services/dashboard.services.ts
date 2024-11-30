import { RoleType, TableStatus } from '~/constants/enums'
import databaseService from '~/services/database.services'

class DashboardService {
  async getDashboardOverview() {
    const today = new Date()
    const startOfDay = new Date(today.setHours(0, 0, 0, 0)).getTime()
    const endOfDay = new Date(today.setHours(23, 59, 59, 999)).getTime()
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getTime()
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getTime()

    // Tính tổng doanh thu hàng ngày
    const dailySalesCursor = databaseService.orders.aggregate([
      { $match: { order_time: { $gte: startOfDay, $lte: endOfDay } } },
      { $group: { _id: null, total: { $sum: '$total_price' } } }
    ])
    const dailySales = await dailySalesCursor.toArray()

    // Tính tổng doanh thu hàng tháng
    const monthlyRevenueCursor = databaseService.orders.aggregate([
      { $match: { order_time: { $gte: startOfMonth, $lte: endOfMonth } } },
      { $group: { _id: null, total: { $sum: '$total_price' } } }
    ])
    const monthlyRevenue = await monthlyRevenueCursor.toArray()

    // Tính chi phí nguyên liệu hàng tháng
    const monthlyIngredientCostCursor = databaseService.inboundOrders.aggregate([
      { $match: { created_at: { $gte: startOfMonth, $lte: endOfMonth } } },
      { $group: { _id: null, total: { $sum: '$total_price' } } }
    ])
    const monthlyIngredientCost = await monthlyIngredientCostCursor.toArray()

    // Tính lương nhân viên hàng tháng
    const monthlySalaryCostCursor = databaseService.users.aggregate([
      { $match: { role: { $in: [RoleType.Employee] }, position: { $exists: true } } },
      { $group: { _id: null, total: { $sum: '$salary' } } }
    ])
    const monthlySalaryCost = await monthlySalaryCostCursor.toArray()

    // Tính số bàn đang sử dụng
    const tableOccupancy = await databaseService.tables.countDocuments({
      status: TableStatus.Busy
    })

    // Lợi nhuận hàng tháng = Doanh thu hàng tháng - (Chi phí nguyên liệu + Lương nhân viên)
    const monthlyProfit =
      (monthlyRevenue[0]?.total || 0) - (monthlyIngredientCost[0]?.total || 0) - (monthlySalaryCost[0]?.total || 0)

    // Lấy món ăn bán chạy nhất (dựa trên quantity_sold của menu_items)
    const topSellingItemsCursor = databaseService.menuItems.find({}).sort({ quantity_sold: -1 }).limit(5) // Lấy top 5 món ăn bán chạy
    const topSellingItems = await topSellingItemsCursor.toArray()

    // Lấy danh sách order gần đây (ưu tiên các order đang phục vụ)
    const recentOrdersCursor = databaseService.orders
      .find({})
      .sort({ created_at: -1 }) // Sắp xếp theo thời gian tạo mới nhất
      .limit(10) // Lấy 10 order gần đây nhất
    const recentOrders = await recentOrdersCursor.toArray()

    return {
      daily_sales: dailySales[0]?.total || 0,
      monthly_revenue: monthlyRevenue[0]?.total || 0,
      table_occupancy: tableOccupancy,
      monthly_profit: monthlyProfit,
      top_selling_items: topSellingItems.map((item: any) => ({
        name: item.name,
        quantity_sold: item.quantity_sold,
        price: item.price,
        image: item.image
      })),
      recent_orders: recentOrders.map((order) => ({
        order_id: order._id,
        table_number: order.table_number,
        order_status: order.order_status,
        total_price: order.total_price,
        created_at: order.created_at
      }))
    }
  }
}
const dashboardService = new DashboardService()
export default dashboardService
