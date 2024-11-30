import { ObjectId } from 'mongodb'
import { PositionEmployeeType } from '~/constants/enums'

interface EmployeeType {
  _id?: ObjectId
  name: string
  position: PositionEmployeeType
  salary: number
  contact_info: string
}

export default class Employee {
  _id?: ObjectId
  name: string
  position: PositionEmployeeType
  salary: number
  contact_info: string

  constructor(employee: EmployeeType) {
    this._id = employee._id
    this.name = employee.name
    this.position = employee.position
    this.salary = employee.salary
    this.contact_info = employee.contact_info
  }
}
