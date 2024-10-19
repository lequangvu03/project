import { sendPost } from '~/api/request'

const menuServices = {
  getDishes: () => {
    return sendPost('/menu')
  }
}

export default menuServices
