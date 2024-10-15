import { ObjectId } from 'mongodb'
import { TableStatus } from '~/constants/enums'
import databaseService from '~/services/database.services'
import tableService from './table.services'

class EmployeeService {
  async getAllEmployees() {
    const employees = await databaseService.employees.find().toArray()
    const total = await databaseService.employees.countDocuments()
    return { employees, total }
  }

  async addEmployee(nameInput: string, contactInfo: string, positionInput: string, salaryInput: number) {
    const newEmployee = await databaseService.employees.insertOne({
      _id: new ObjectId(),
      name: nameInput,
      contact_info: contactInfo,
      position: positionInput,
      salary: salaryInput
    })

    return newEmployee
  }
  async updateEmployee(id: string, nameInput: string, contactInfo: string, positionInput: string, salaryInput: number) {
    const updatedEmployee = await databaseService.employees.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name: nameInput,
          contact_info: contactInfo,
          position: positionInput,
          salary: salaryInput
        }
      }
    )
    return updatedEmployee
  }
  // xóa nhân viên
  // testing
  async deleteEmployeeById(id: string) {
    const deletedEmployee = await databaseService.employees.deleteOne({ _id: new ObjectId(id) })
    return deletedEmployee
  }
}
const employeeService = new EmployeeService()
export default employeeService
