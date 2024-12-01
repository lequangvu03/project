import { ObjectId } from 'mongodb'
import InboundOrder from '~/models/schemas/inboundOrder.schema'
import databaseService from '~/services/database.services'

class InboundOrderService {
  async getAllInboundOrders({
    limit,
    page,
    sortBy,
    sortOrder,
    id
  }: {
    limit: number
    page: number
    sortBy?: string
    sortOrder?: string
    id?: string
  }) {
    const matchFilter: any = {}
    limit = limit && Number.isInteger(limit) ? limit : 10 // Default to 10
    page = page && Number.isInteger(page) && page > 0 ? page : 1 // Default to page 1

    const sortQuery: { [key: string]: 1 | -1 } = {
      [sortBy || 'created_at']: sortOrder === 'ascend' ? 1 : -1 // Sort by created_at or specified field
    }

    if (id) {
      matchFilter._id = new ObjectId(id) // Match specific inbound order by id
    }

    const pipeline = [
      {
        $unwind: { path: '$inbound_order_items', preserveNullAndEmptyArrays: true }
      },
      {
        $match: matchFilter // Apply the filter for matching documents
      },
      {
        $lookup: {
          from: 'ingredients', // Lookup from ingredients collection
          let: { itemId: '$inbound_order_items._id' }, // Pass _id from inbound_order_items
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$itemId'] } } } // Match the ingredients' _id with the itemId
          ],
          as: 'ingredients_details' // Store the results in the 'ingredients_details' field
        }
      },
      {
        $addFields: {
          inbound_order_items: {
            $mergeObjects: [
              '$inbound_order_items',
              {
                item_name: { $arrayElemAt: ['$ingredients_details.name', 0] },
                item_price: { $arrayElemAt: ['$ingredients_details.price', 0] }
              }
            ]
          }
        }
      },
      {
        $unset: 'ingredients_details' // Remove the temporary ingredients_details field
      },
      {
        $group: {
          _id: '$_id', // Group by _id of inbound order
          created_at: { $first: '$created_at' },
          updated_at: { $first: '$updated_at' },
          inbound_order_items: { $push: '$inbound_order_items' }, // Include the items with the merged data
          total_price: { $first: '$total_price' } // Include total price of the order
        }
      },
      {
        $sort: { created_at: -1 } // Sort by created_at, you can change to sort by any field
      }
    ]

    // Execute the query with the pipeline
    const inboundOrders = await databaseService.inboundOrders
      .aggregate(pipeline)
      .skip(limit * (page - 1)) // Skip for pagination
      .limit(limit) // Limit the number of results
      .toArray()

    const total = await databaseService.inboundOrders.countDocuments(matchFilter) // Get total count for pagination

    return { inboundOrders, total }
  }

  async addInboundOrders(data: InboundOrder) {
    const inboundOrderItems = data.inbound_order_items.map((item) => ({
      ...item,
      _id: new ObjectId(item._id)
    }))
    const inboundOrders = await databaseService.inboundOrders.insertOne(
      new InboundOrder({
        _id: new ObjectId(),
        ...data,
        inbound_order_items: inboundOrderItems
      })
    )
    return inboundOrders
  }

  async updateInboundOrders(id: string, data: InboundOrder) {
    const updatedInboundOrder = await databaseService.inboundOrders.findOneAndUpdate(
      {
        _id: new ObjectId(id)
      },
      {
        $set: {
          ...data,
          updated_at: Date.now()
        }
      },
      { returnDocument: 'after' }
    )
    return updatedInboundOrder
  }
  async deleteInboundOrders(id: string) {
    const inboundOrders = await databaseService.inboundOrders.deleteOne({ _id: new ObjectId(id) })
    return inboundOrders
  }
}
const inboundOrderService = new InboundOrderService()
export default inboundOrderService
