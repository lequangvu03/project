import { sendGet } from '~/api/request'

const menuServices = {
  getDishes: () => {
    return sendGet('/menu')
  }
}

export default menuServices
