import { Router } from 'express'
import {
  addEmployeeController,
  deleteEmployeeController,
  getAllEmployeesController,
  updateEmployeeController
} from '~/controllers/employee.controllers'
import { accessTokenValidator } from '~/middlewares/auth.middlewares'
import {
  addEmployeeValidator,
  deleteEmployeeValidator,
  updateEmployeeValidator
} from '~/middlewares/employee.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

export const employeeRouter = Router()

/**
 * path: api/employee/
 * method: GET
 * header: {Authorization: Bearer <access_token>}
 * description: Get all employees
 * response: {message: string, result: {employees: EmployeeType[], total: number}}
 * */

employeeRouter.get('/', accessTokenValidator, wrapRequestHandler(getAllEmployeesController))

/**
 * path: api/employee/
 * method: POST
 * header: {Authorization: Bearer <access_token>}
 * body: {name: string, contact_info: string, position: string, salary: number}
 * description: Add a new employee
 * response: {message: string, result: EmployeeType}
 * */

// TODO: addBookingValidator
employeeRouter.post('/', accessTokenValidator, addEmployeeValidator, wrapRequestHandler(addEmployeeController))

/**
 * path: api/employee/
 * method: PUT
 * header: {Authorization: Bearer <access_token>}
 * body: {name: string, contact_info: string, position: string, salary: number}
 * description: Update a employee
 * response: {message: string, result: TableType}
 * */
employeeRouter.put('/:id', accessTokenValidator, updateEmployeeValidator, wrapRequestHandler(updateEmployeeController))

/**
 * path: api/table/
 * method: DELETE
 * header: {Authorization: Bearer <access_token>}
 * body: {table_number: number}
 * description: Delete a table
 * response: {message: string, result: TableType}
 * */
employeeRouter.delete(
  '/:id',
  deleteEmployeeValidator,
  accessTokenValidator,
  wrapRequestHandler(deleteEmployeeController)
)
