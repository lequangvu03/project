import Order from '~/models/schemas/orders.schema'

import databaseService from './database.services'
import { Filter, ObjectId } from 'mongodb'
import { OrderStatus, PaymentStatus, TableStatus } from '~/constants/enums'

class OrderService {
  async getAllOrders({
    limit,
    page,
    sortBy,
    sortOrder,
    status,
    table_number
  }: {
    limit: number
    page: number
    sortBy?: string
    sortOrder?: string
    status?: number
    table_number?: number
  }) {
    const matchFilter: any = {}
    // Gán giá trị mặc định nếu `limit` hoặc `page` không được truyền
    limit = limit && Number.isInteger(limit) ? limit : 10 // Mặc định là 10
    page = page && Number.isInteger(page) && page > 0 ? page : 1 // Mặc định là 1

    const sortQuery: { [key: string]: 1 | -1 } = {
      [sortBy || 'created_at']: sortOrder === 'ascend' ? 1 : -1
    }
    if (status && status != -1) {
      matchFilter.order_status = +status
    }
    if (table_number) {
      matchFilter.table_number = +table_number
    }

    const pipeline = [
      { $unwind: { path: '$order_items', preserveNullAndEmptyArrays: true } },
      {
        $match: matchFilter
      },
      {
        $lookup: {
          from: 'menu_items',
          let: { item_id: { $toObjectId: '$order_items.item_id' } },
          pipeline: [{ $match: { $expr: { $eq: ['$_id', '$$item_id'] } } }],
          as: 'menu_item_details'
        }
      },
      {
        $addFields: {
          order_items: {
            $mergeObjects: [
              '$order_items',
              {
                item_name: { $arrayElemAt: ['$menu_item_details.name', 0] },
                item_price: { $arrayElemAt: ['$menu_item_details.price', 0] }
              }
            ]
          }
        }
      },
      { $unset: 'menu_item_details' },
      {
        $group: {
          _id: '$_id',
          order_time: { $first: '$order_time' },
          table_number: { $first: '$table_number' },
          total_price: { $first: '$total_price' },
          payment_status: { $first: '$payment_status' },
          order_status: { $first: '$order_status' },
          created_at: { $first: '$created_at' },
          updated_at: { $first: '$updated_at' },
          order_items: { $push: '$order_items' }
        }
      },
      { $sort: { order_time: -1 } }
    ]

    const orders = await databaseService.orders
      .aggregate(pipeline)
      .sort(sortQuery)
      .skip(limit * (page - 1)) // Sử dụng giá trị đã kiểm tra
      .limit(limit) // Sử dụng giá trị đã kiểm tra
      .toArray()

    const total = await databaseService.orders.countDocuments(matchFilter)

    return { orders, total }
  }

  async getOrdersById(id: string) {
    const orders = await databaseService.orders
      .aggregate([
        { $match: { _id: new ObjectId(id) } },
        { $unwind: { path: '$order_items', preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: 'menu_items',
            let: { item_id: { $toObjectId: '$order_items.item_id' } },
            pipeline: [{ $match: { $expr: { $eq: ['$_id', '$$item_id'] } } }],
            as: 'menu_item_details'
          }
        },
        {
          $addFields: {
            order_items: {
              $mergeObjects: [
                '$order_items',
                {
                  item_name: { $arrayElemAt: ['$menu_item_details.name', 0] },
                  item_price: { $arrayElemAt: ['$menu_item_details.price', 0] }
                }
              ]
            }
          }
        },
        { $unset: 'menu_item_details' },
        {
          $group: {
            _id: '$_id',
            order_time: { $first: '$order_time' },
            table_number: { $first: '$table_number' },
            total_price: { $first: '$total_price' },
            payment_status: { $first: '$payment_status' },
            order_status: { $first: '$order_status' },
            created_at: { $first: '$created_at' },
            updated_at: { $first: '$updated_at' },
            order_items: { $push: '$order_items' }
          }
        },
        { $sort: { order_time: -1 } }
      ])
      .toArray()

    const total = orders.length
    return { orders, total }
  }
  async addOrder(data: {
    table_number: number
    order_items: Array<{ item_id: string; quantity: number; price_per_item: number }>
    total_price: number
  }) {
    const orderItems = data.order_items.map((item) => ({
      ...item,
      item_id: new ObjectId(item.item_id)
    }))
    const newOrder = new Order({
      ...data,
      order_items: orderItems,
      payment_status: PaymentStatus.Unpaid,
      order_status: OrderStatus.Pending,
      created_at: Date.now(),
      updated_at: Date.now()
    })
    await databaseService.orders.insertOne(newOrder)
    await databaseService.tables.updateOne(
      {
        table_number: data.table_number
      },
      {
        $set: {
          status: TableStatus.Busy
        }
      }
    )
    return newOrder
  }

  // Cập nhật đơn hàng
  async updateOrder(
    orderId: string,
    order_data: {
      table_number?: number
      order_items?: Array<{ item_id: string; quantity: number; price_per_item: number }>
      total_price?: number
      payment_status?: string
      order_status?: string
    }
  ) {
    const objectOrderId = new ObjectId(orderId)

    let updatedOrderItems: Array<{ item_id: ObjectId; quantity: number; price_per_item: number }> = []
    if (order_data.order_items) {
      updatedOrderItems = order_data.order_items.map((item) => ({
        ...item,
        item_id: new ObjectId(item.item_id)
      }))
    }

    const updateData: any = {
      updated_at: Date.now(),
      ...Object.fromEntries(Object.entries(order_data).filter(([key, value]) => value !== undefined)),
      order_items: updatedOrderItems.length > 0 ? updatedOrderItems : undefined // Cập nhật order_items nếu có
    }

    await databaseService.orders.updateOne({ _id: objectOrderId }, { $set: updateData })

    return updateData
  }

  async deleteOrder(orderId: string) {
    await databaseService.orders.deleteOne({ _id: new ObjectId(orderId) })
    return { message: 'Order deleted successfully' }
  }
}

const orderService = new OrderService()
export default orderService
