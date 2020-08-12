"use strict";
import Taro from '@tarojs/taro';
import TaroRequest from '@bucai/taro-request';
import commonConfig from '../config/common.config';

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// console.log(process.env.NODE_ENV);

let _config = {
  baseURL: commonConfig.baseURL
  // timeout: 60 * 1000, // Timeout 
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = TaroRequest.create(_config);

_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    const token = Taro.getStorageSync('token');
    if (token && config.headers) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    const resData = response.data;
    if (resData.code === 0 || resData.code === 200) {
      return resData.data;
    } else {

      if (resData.code === 403 || resData.code > 1000 && resData.code <= 1010) {
        Taro.redirectTo({
          url: '/',
        });
      } else {
        Taro.showToast({
          title: resData.message || '服务器错误',
          icon: 'none',
        });
      }

    }
    return Promise.reject(resData);
  },
  function (error) {
    console.log(error);
    Taro.showToast({
      title: '服务器错误',
      icon: 'none',
    });
    // Do something with response error
    return Promise.reject(error);
  }
);

export default _axios;