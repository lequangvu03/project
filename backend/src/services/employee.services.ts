import { ObjectId } from 'mongodb'
import { RoleType } from '~/constants/enums'
import databaseService from '~/services/database.services'

class EmployeeService {
  async getAllEmployees({
    limit,
    page,
    sortBy,
    sortOrder,
    name
  }: {
    limit: number
    page: number
    sortBy?: string
    sortOrder?: string
    name?: string
  }) {
    const matchFilter: any = {
      role: RoleType.Employee
    }
    limit = limit && Number.isInteger(limit) ? limit : 10 // Mặc định là 10
    page = page && Number.isInteger(page) && page > 0 ? page : 1 // Mặc định là 1
    const sortQuery: { [key: string]: 1 | -1 } = {
      [sortBy || 'created_at']: sortOrder === 'ascend' ? 1 : -1
    }
    if (name) {
      matchFilter.name = { $regex: new RegExp(name, 'i') }
    }
    const employees = await databaseService.users
      .find(matchFilter)
      .sort(sortQuery)
      .skip(limit * (page - 1)) // Sử dụng giá trị đã kiểm tra
      .limit(limit) // Sử dụng giá trị đã kiểm tra
      .toArray()
    const total = await databaseService.users.countDocuments(matchFilter)
    return { employees, total }
  }

  async addEmployee(data: any) {
    const newEmployee = await databaseService.employees.insertOne({
      _id: new ObjectId(),
      ...data
    })

    return newEmployee
  }
  async updateEmployee(id: string, data: any) {
    const updatedEmployee = await databaseService.users.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...data
        }
      },
      { returnDocument: 'after' }
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
