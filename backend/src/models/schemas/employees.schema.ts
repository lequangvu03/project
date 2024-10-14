import { ObjectId } from 'mongodb'

interface EmployeeType {
  name: string
  position: string
  salary: number
  contact_info: string
}

export default class Employee {
  name: string
  position: string
  salary: number
  contact_info: string

  constructor(employee: EmployeeType) {
    this.name = employee.name
    this.position = employee.position
    this.salary = employee.salary
    this.contact_info = employee.contact_info
  }
}
