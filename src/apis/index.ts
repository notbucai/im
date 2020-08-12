/*
 * @Author: bucai
 * @Date: 2020-07-16 22:22:21
 * @LastEditors: bucai
 * @LastEditTime: 2020-08-11 14:52:52
 * @Description: 
 */
// import request from 'taro-request';


import $http from '../request/index';

// import TaroRequest from '@b/ucai/taro-request';

// TaroRequest.defaults.baseURL = "https://binguoai.com";

// const _ar = TaroRequest.create({
//   baseURL:"https://binguoai.com"
// })

export const messageList = async () => {
  console.log(1);

  return $http.get('/messageList');
  // Taro.request({
  //   url: "/"
  // });
}
export const getChatListById = async () => {

  return $http.get('/getChatListById');
}

export const changeUserStatus = async (status: boolean) => {
  return $http.put('/changeUserStatus', { status });
}

export const userinfo = async () => {
  return $http.get('/userinfo');
}

export const userList = async () => {
  return $http.get('/user/list');
}

export const login = async (data) => {
  return $http.post('/login', data);
}

export const userlist1 = async () => {
  return $http.get('/userlist');
}

