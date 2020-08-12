/*
 * @Author: bucai
 * @Date: 2020-07-16 22:17:52
 * @LastEditors: bucai
 * @LastEditTime: 2020-08-11 16:51:24
 * @Description: 
 */
import production from './production.config';

const config = {
  development: {
    baseURL: process.env.TARO_ENV === 'h5' ? '' : 'https://im.notbucai.com',
    SDKAppID: 1400302949
  },
  production
}

export default config[process.env.NODE_ENV];