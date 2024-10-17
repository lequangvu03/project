import { getAccessToken } from './axiosInstances';

/* eslint-disable @typescript-eslint/no-explicit-any */
async function get(url: string = '', data: any = {}) {
  const token = await getAccessToken();
  let query = null;
  if (data && Object.keys(data).length) {
    query = `?${new URLSearchParams(data)}`;
  }
  const urlWithParams = `${url}${query || ''}`;
  const response = await fetch(urlWithParams, {
    method: 'GET',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  });

  return response.json();
}

// Doc: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#supplying_request_options
async function post(url: string = '', data: any = {}) {
  const token = await getAccessToken();
  const response = await fetch(url, {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });

  return response.json();
}

async function patch(url: string = '', data: any = {}) {
  const token = await getAccessToken();
  const response = await fetch(url, {
    method: 'PATCH',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });

  return response.json();
}

async function del(url: string = '', data: any = {}) {
  const token = await getAccessToken();
  const response = await fetch(url, {
    method: 'DELETE',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });

  return response.json();
}

const apiRequest = {
  get,
  post,
  patch,
  del,
};

export default apiRequest;
