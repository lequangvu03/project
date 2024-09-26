import { NextFunction, Request, Response } from 'express'
import { TABLE_MESSAGES } from '~/constants/messages'
import tableService from '~/services/table.services'
export const getAllTableController = async (req: Request, res: Response, error: NextFunction) => {
  const result = await tableService.getAllTables()
  return res.status(200).json({ message: TABLE_MESSAGES.GET_ALL_TABLE_SUCCESS, result })
}
export const addTableController = async (req: Request, res: Response, error: NextFunction) => {
  const { table_number, seat_number } = req.body
  const result = await tableService.addTable(table_number, seat_number)
  return res.status(201).json({ message: TABLE_MESSAGES.ADD_TABLE_SUCCESS, result })
}
export const updateTableController = async (req: Request, res: Response, error: NextFunction) => {
  const result = await tableService.updateTable(req.params.id, req.body.seat_number)
  return res.status(200).json({ message: TABLE_MESSAGES.UPDATE_TABLE_SUCCESS, result })
}
export const deleteTableController = async (req: Request, res: Response, error: NextFunction) => {
  const result = await tableService.deleteTable(req.params.id)
  return res.status(200).json({ message: TABLE_MESSAGES.DELETE_TABLE_SUCCESS, result })
}
