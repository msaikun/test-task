import axios, { AxiosRequestConfig, AxiosRequestHeaders, Method } from 'axios';

const BASE_URL = 'http://localhost:8001';

export type TApiCaller = <R = unknown, T = unknown> (
  endpoint: string,
  request?: { data?: T, method?: Method },
) => Promise<({ data: R })>;

export const apiCaller: TApiCaller = (
  endpoint,
  request = {},
) => {
  const { data, method = 'get' } = request;

  const headers = {} as AxiosRequestHeaders;

  headers['Content-Type'] = 'application/json';

  const requestData: AxiosRequestConfig = { headers, method };

  if (method === 'get') {
    requestData.params = data;
  } else if (data) {
    requestData.data = data;
  }

  return axios({ url: `${BASE_URL}/${endpoint}`, ...requestData })
    .then((res) => ({ data: res.data }));
};
