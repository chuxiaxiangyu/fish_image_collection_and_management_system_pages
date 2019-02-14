import Axios from 'axios';

// Axios.defaults.baseURL = 'http://192.168.1.101:3000/';
Axios.defaults.baseURL = 'http://192.168.1.76:3000';
let baseHttp = {
  get: (url, params = {}) => {
    return Axios.get(url, {
      ...params
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

//相应拦截器
Axios.interceptors.response.use(res => {
  return Promise.resolve(res.data);
});

export const post = baseHttp.post;
export const get = baseHttp.get;
