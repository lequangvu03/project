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
    const dailySales = await databaseService.orders
      .aggregate([
        { $match: { order_time: { $gte: startOfDay, $lte: endOfDay } } },
        { $group: { _id: null, total: { $sum: '$total_price' } } }
      ])
      .toArray()

    // Tính tổng doanh thu hàng tháng
    const monthlyRevenue = await databaseService.orders
      .aggregate([
        { $match: { order_time: { $gte: startOfMonth, $lte: endOfMonth } } },
        { $group: { _id: null, total: { $sum: '$total_price' } } }
      ])
      .toArray()

    // Tính chi phí nguyên liệu hàng tháng
    const monthlyIngredientCost = await databaseService.inboundOrders
      .aggregate([
        { $match: { created_at: { $gte: startOfMonth, $lte: endOfMonth } } },
        { $group: { _id: null, total: { $sum: '$total_price' } } }
      ])
      .toArray()

    // Tính lương nhân viên hàng tháng
    const monthlySalaryCost = await databaseService.users
      .aggregate([
        {
          $match: {
            role: { $in: [RoleType.Employee] },
            position: { $exists: true },
            created_at: { $lte: endOfMonth } // Chỉ tính nhân viên được tạo trước hoặc trong tháng
          }
        },
        { $group: { _id: null, total: { $sum: '$salary' } } }
      ])
      .toArray()

    // Tính số bàn đang sử dụng
    const tableOccupancy = await databaseService.tables.countDocuments({
      status: TableStatus.Busy
    })

    // Lợi nhuận hàng tháng = Doanh thu hàng tháng - (Chi phí nguyên liệu + Lương nhân viên)
    const monthlyProfit =
      (monthlyRevenue[0]?.total || 0) - (monthlyIngredientCost[0]?.total || 0) - (monthlySalaryCost[0]?.total || 0)

    // Lấy món ăn bán chạy nhất
    const topSellingItems = await databaseService.menuItems.find({}).sort({ quantity_sold: -1 }).limit(5).toArray()

    // Lấy danh sách order gần đây
    const recentOrders = await databaseService.orders.find({}).sort({ created_at: -1 }).limit(10).toArray()

    // Dữ liệu biểu đồ 7 tháng gần nhất
    const todayYear = today.getFullYear()
    const todayMonth = today.getMonth()

    const lastSevenMonthsData = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(todayYear, todayMonth - (6 - i), 1) // Lùi tháng
      return {
        startOfMonth: date.getTime(),
        endOfMonth: new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999).getTime(),
        month: date.toLocaleString('en-US', { month: 'long', year: 'numeric' }) // VD: "May 2024"
      }
    })

    const chartData = []
    for (const { startOfMonth, endOfMonth, month } of lastSevenMonthsData) {
      const revenue = await databaseService.orders
        .aggregate([
          { $match: { order_time: { $gte: startOfMonth, $lte: endOfMonth } } },
          { $group: { _id: null, total: { $sum: '$total_price' } } }
        ])
        .toArray()

      const ingredientCost = await databaseService.inboundOrders
        .aggregate([
          { $match: { created_at: { $gte: startOfMonth, $lte: endOfMonth } } },
          { $group: { _id: null, total: { $sum: '$total_price' } } }
        ])
        .toArray()

      const salaryCost = await databaseService.users
        .aggregate([
          {
            $match: {
              role: { $in: [RoleType.Employee] },
              position: { $exists: true },
              created_at: { $lte: endOfMonth } // Chỉ tính nhân viên được tạo trước hoặc trong tháng
            }
          },
          { $group: { _id: null, total: { $sum: '$salary' } } }
        ])
        .toArray()

      const totalRevenue = revenue[0]?.total || 0
      const totalIngredientCost = ingredientCost[0]?.total || 0
      const totalSalaryCost = salaryCost[0]?.total || 0
      const profit = totalRevenue - (totalIngredientCost + totalSalaryCost)

      chartData.push({ month, revenue: totalRevenue, profit })
    }

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
      })),
      chart_data: chartData // Dữ liệu biểu đồ 7 tháng gần nhất
    }
  }
}
const dashboardService = new DashboardService()
export default dashboardService
