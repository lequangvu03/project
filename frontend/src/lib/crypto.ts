import CryptoJS from 'crypto-js'

export const encrypt = (message: string, salt: string = process.env.NEXT_PUBLIC_SALT as string) => {
  return CryptoJS.AES.encrypt(message, salt).toString()
}

export const decrypt = (ciphertext: string, salt: string = process.env.NEXT_PUBLIC_SALT as string) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, salt)
  return bytes.toString(CryptoJS.enc.Utf8)
}
