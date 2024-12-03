import { TagType } from '~/definitions/constant/types.constant'

export interface IMenuItem {
  _id: string
  name: string
  description: string
  price: number
  tag: TagType[]
  category_id: string
  stock: number
  image: string
  ingredients: {
    quantity: number
    _id: string
    unit: string
    name: string
  }[]
  created_at: number
  updated_at: number
  status: number
  quantity_sold: number
  category_name: string
}
