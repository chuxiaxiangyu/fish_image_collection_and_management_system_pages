import Axios from 'axios';

Axios.defaults.baseURL = 'http://172.0.0.1:3000';

let baseHttp = {
  get: (url, params = {}) => {
    return Axios.get(url, {
      params: {
        ...params
      }
    })

  },
  post: (url, params = {}) => {
    return Axios.post(url, {
      ...params
    })
  }
};

//请求拦截器
Axios.interceptors.request.use(config => {
  return Promise.resolve(config);
});

//响应拦截器
Axios.interceptors.response.use(res => {
  return Promise.resolve(res.data);
});

export const post = baseHttp.post;
export const get = baseHttp.get;
