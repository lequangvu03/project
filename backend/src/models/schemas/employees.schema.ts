import { ObjectId } from "mongodb"

interface EmployeeType {
  employee_id: ObjectId
  name: string
  position: string
  salary: number
  contact_info: string
}

export default class Employee {
  employee_id: ObjectId
  name: string
  position: string
  salary: number
  contact_info: string

  constructor(employee: EmployeeType) {
    this.employee_id = employee.employee_id
    this.name = employee.name
    this.position = employee.position
    this.salary = employee.salary
    this.contact_info = employee.contact_info
  }
}