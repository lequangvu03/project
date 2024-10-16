/* eslint-disable @typescript-eslint/no-explicit-any */
import { protectedAxiosInstance, cancelTokenSource } from '~/api/request/axiosInstances';

/**
 * Protected apis
 */
export const sendGet = (url: string, params?: any) =>
  protectedAxiosInstance.get(url, { params }).then((res) => res.data);

export const sendGetWitCancelToken = (url: string, cancelToken: any, params?: any) =>
  protectedAxiosInstance.get(url, { cancelToken, params }).then((res) => res.data);

export const sendPost = (url: string, params?: any, queryParams?: any) =>
  protectedAxiosInstance.post(url, params, { params: queryParams }).then((res) => res.data);

export const sendPostUpload = (url: string, params?: any, callback?: any) =>
  protectedAxiosInstance
    .post(url, params, {
      onUploadProgress: (event) => callback(event),
      cancelToken: cancelTokenSource.token,
    })
    .then((res) => res.data);

export const sendPut = (url: string, params?: any) => protectedAxiosInstance.put(url, params).then((res) => res.data);

export const sendPatch = (url: string, params?: any) =>
  protectedAxiosInstance.patch(url, params).then((res) => res.data);

export const sendDelete = (url: string, params?: any) =>
  protectedAxiosInstance.delete(url, { params }).then((res) => res.data);
