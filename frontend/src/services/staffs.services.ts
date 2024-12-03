import { sendGet, sendPatch, sendPut } from '~/api/request'

const staffsServices = {
  getStaff() {
    return sendGet('/employee')
  },
  getStaffById(id: string) {
    return sendGet('/employee/',{
      id: id
    })
  },
  updateStaff({
    id,
    body
  }: {
    id: string
    body: {
      name: string
      salary: number
      contact_info: string
      position: number
    }
  }) {
    return sendPut('/employee/' + id, body)
  }
}

export default staffsServices
