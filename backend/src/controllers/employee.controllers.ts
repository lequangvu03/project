import { NextFunction, Request, Response } from 'express'
import { BOOKING_MESSAGE, EMPLOYEE_MESSAGE, TABLE_MESSAGES } from '~/constants/messages'
import employeeService from '~/services/employee.services'

export const getAllEmployeesController = async (req: Request, res: Response, error: NextFunction) => {
  const result = await employeeService.getAllEmployees()
  return res.status(200).json({ message: EMPLOYEE_MESSAGE.GET_ALL_EMPLOYEE_SUCCESS, result })
}

export const addEmployeeController = async (req: Request, res: Response, error: NextFunction) => {
  const { name, contact_info, position, salary } = req.body
  const result = await employeeService.addEmployee(name, contact_info, position, salary)
  return res.status(201).json({ message: EMPLOYEE_MESSAGE.ADD_NEW_EMPLOYEE_SUCCESS, result })
}
export const updateEmployeeController = async (req: Request, res: Response, error: NextFunction) => {
  const id = req.params.id
  const { name, contact_info, position, salary } = req.body
  const result = await employeeService.updateEmployee(id, name, contact_info, position, salary)
  return res.status(200).json({ message: EMPLOYEE_MESSAGE.UPDATE_EMPLOYEE_SUCCESS, result })
}
export const deleteEmployeeController = async (req: Request, res: Response, error: NextFunction) => {
  const result = await employeeService.deleteEmployeeById(req.params.id)
  return res.status(200).json({ message: EMPLOYEE_MESSAGE.DELETE_EMPLOYEE_SUCCESS, result })
}
