/* eslint-disable @typescript-eslint/no-explicit-any */
import { cancelTokenSource, publicAxiosInstance } from '~/api/request/axiosInstances';

/**
 * Public apis
 */
export const publicGet = (url: string, params?: any) =>
  publicAxiosInstance.get(url, { params }).then((res) => res.data);

export const publicGetWitCancelToken = (url: string, cancelToken: any, params?: any) =>
  publicAxiosInstance.get(url, { cancelToken, params }).then((res) => res.data);

export const publicPost = (url: string, body?: any) => publicAxiosInstance.post(url, body).then((res) => res.data);

export const publicPostUpload = (url: string, params?: any, callback?: any) =>
  publicAxiosInstance
    .post(url, params, {
      onUploadProgress: (event) => callback(event),
      cancelToken: cancelTokenSource.token,
    })
    .then((res) => res.data);

export const publicPut = (url: string, params?: any) => publicAxiosInstance.put(url, params).then((res) => res.data);

export const publicPatch = (url: string, params?: any) =>
  publicAxiosInstance.patch(url, params).then((res) => res.data);

export const publicDelete = (url: string, params?: any) =>
  publicAxiosInstance.delete(url, { params }).then((res) => res.data);
