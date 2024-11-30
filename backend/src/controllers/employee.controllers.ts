import { NextFunction, Request, Response } from 'express'
import { EMPLOYEE_MESSAGE } from '~/constants/messages'
import employeeService from '~/services/employee.services'

export const getAllEmployeesController = async (req: Request, res: Response, error: NextFunction) => {
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const sortBy = req.query.sortBy as string | undefined
  const sortOrder = req.query.sortOrder as 'asc' | 'desc' | undefined
  const name = (req.query.name as string) || ''
  const result = await employeeService.getAllEmployees({ limit, page, sortBy, sortOrder, name })
  return res.status(200).json({ message: EMPLOYEE_MESSAGE.GET_ALL_EMPLOYEE_SUCCESS, result })
}

export const addEmployeeController = async (req: Request, res: Response, error: NextFunction) => {
  const result = await employeeService.addEmployee(req.body)
  return res.status(201).json({ message: EMPLOYEE_MESSAGE.ADD_NEW_EMPLOYEE_SUCCESS, result })
}
export const updateEmployeeController = async (req: Request, res: Response, error: NextFunction) => {
  const id = req.params.id
  const result = await employeeService.updateEmployee(id, req.body)
  return res.status(200).json({ message: EMPLOYEE_MESSAGE.UPDATE_EMPLOYEE_SUCCESS, result })
}
export const deleteEmployeeController = async (req: Request, res: Response, error: NextFunction) => {
  const result = await employeeService.deleteEmployeeById(req.params.id)
  return res.status(200).json({ message: EMPLOYEE_MESSAGE.DELETE_EMPLOYEE_SUCCESS, result })
}
