/*
 * @Author: bucai
 * @Date: 2020-07-14 22:15:09
 * @LastEditors: bucai
 * @LastEditTime: 2020-07-14 22:20:50
 * @Description: 
 */
import Taro from '@tarojs/taro';
import { useState, useEffect } from "react";

const useSystemInfo = () => {
  const [statusBarHeight, setStatusBarHeight] = useState<Taro.getSystemInfo.Result>();
  // const 
  useEffect(() => {
    Taro.getSystemInfo({
      success (res) {
        setStatusBarHeight(res);
      }
    })
    return () => { };
  }, []);
  return statusBarHeight;
}

export default useSystemInfo;