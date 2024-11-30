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
import { updateProfileValidator } from '~/middlewares/user.middlewares'
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
 * method: PUT
 * header: {Authorization: Bearer <access_token>}
 * body: {name: string, contact_info: string, position: string, salary: number}
 * description: Update a employee
 * response: {message: string, result: EmployeeType}
 * */
employeeRouter.put('/:id', accessTokenValidator, updateProfileValidator, wrapRequestHandler(updateEmployeeController))

/**
 * path: api/employee/
 * method: DELETE
 * header: {Authorization: Bearer <access_token>}
 * body: {table_number: number}
 * description: Delete a employee
 * response: {message: string, result: EmployeeType}
 * */
employeeRouter.delete(
  '/:id',
  accessTokenValidator,
  deleteEmployeeValidator,
  wrapRequestHandler(deleteEmployeeController)
)
