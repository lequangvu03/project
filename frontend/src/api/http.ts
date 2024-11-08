import { redirect } from 'next/navigation'
import HTTP_STATUS_CODE from '~/definitions/constant/httpStatusCode.constant'
import { handleErrorAPI, normalizePath } from '~/lib/utils'
import { TLoginResponse } from '~/models/auth.module'

export type EntityErrorPayload = {
  message: string
  errors: {
    [key: string]: {
      type: string
      value: string
      msg: string
      path: string
      location: string
    }
  }
}

export class HttpError extends Error {
  status: number
  payload: {
    message: string
    [key: string]: any
  }

  constructor({ status, payload }: { status: number; payload: any }) {
    super('Http Error')
    this.status = status
    this.payload = payload
  }
}

export class EntityError extends HttpError {
  status: 422
  payload: EntityErrorPayload

  constructor({ status, payload }: { status: 422; payload: EntityErrorPayload }) {
    super({ status, payload })
    this.status = status
    this.payload = payload
  }
}

export type Options = Omit<RequestInit, 'method'> & {
  baseUrl?: string
}

export const isClient = () => typeof window !== 'undefined'

let clientLoggedOutRequest: null | Promise<any> = null

const request = async <Response>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, options?: Options) => {
  const headers: {
    [key: string]: string
  } =
    options?.body instanceof FormData
      ? {}
      : {
          'Content-Type': 'application/json'
        }

  if (isClient()) {
    const sessionToken = localStorage.getItem('sessionToken')
    if (sessionToken) {
      headers.Authorization = `Bearer ${sessionToken}`
    }
  }

  const baseUrl =
    options?.baseUrl === undefined
      ? process.env.NEXT_PUBLIC_API_BASE_URL
      : options.baseUrl === ''
        ? 'http://localhost:3000/api'
        : options.baseUrl

  const normalizeUrl = normalizePath(url)
  const fullUrl = `${baseUrl}${normalizeUrl}`
  const res = await fetch(fullUrl, {
    headers: {
      ...headers,
      ...options?.headers
    } as any,
    body: options?.body,
    method,
    next: options?.next
  })

  let payload: Response = await res.json()

  const data = {
    status: res.status,
    payload
  }

  if (!res.ok) {
    if (res.status === HTTP_STATUS_CODE.EntityError) {
      throw new EntityError(data as { status: 422; payload: EntityErrorPayload })
    } else if (res.status === HTTP_STATUS_CODE.AuthenticationError) {
      if (isClient()) {
        if (!clientLoggedOutRequest) {
          clientLoggedOutRequest = fetch(`/api/auth/logout`, {
            method: 'POST',
            body: JSON.stringify({ force: true }),
            headers: { ...headers } as any
          })
          localStorage.removeItem('sessionToken')
          localStorage.removeItem('expiresAt')
          try {
            await clientLoggedOutRequest
          } catch (error: any) {
            handleErrorAPI(error)
          }
          location.href = '/login'
        }
      } else {
        const sessionToken = (options?.headers as any)?.Authorization.split('Bearer ')[1]
        redirect(`/logout?sessionToken=${sessionToken}`)
      }
    } else {
      throw new HttpError(data)
    }
  }

  if (isClient()) {
    if (['/auth/login', '/auth/register'].some((e) => e === normalizeUrl)) {
      const { result } = payload as TLoginResponse
      localStorage.setItem('accessToken', result.access_token)
      localStorage.setItem('refreshToken', result.access_token)
      // localStorage.setItem('expiresAt', result.expiresAt)
    } else if ('/auth/logout' === normalizeUrl) {
      localStorage.removeItem('sessionToken')
      localStorage.removeItem('expiresAt')
    }
  }

  return data
}

const http = {
  get: <Response>(url: string, options?: Omit<Options, 'body'>) => request<Response>('GET', url, options),
  post: <Response>(url: string, options?: Options) => request<Response>('POST', url, options),
  put: <Response>(url: string, options?: Options) => request<Response>('PUT', url, options),
  delete: <Response>(url: string, options?: Omit<Options, 'body'>) => request<Response>('DELETE', url, options)
}

export default http
