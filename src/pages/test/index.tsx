import React from 'react';

import { View, Input, BaseEventOrig } from '@tarojs/components';

import Taro, { useRouter, useReady, usePullDownRefresh } from '@tarojs/taro';

import './index.scss';

export default () => {

  useReady(() => {
    setTimeout(() => {
      Taro.pageScrollTo({
        scrollTop: 9999999999,
        duration: 0,
      });
    }, 1000);
  });

  usePullDownRefresh(() => {
    console.log('我根本不会执行');
    setTimeout(() => {
      Taro.stopPullDownRefresh();
    }, 1000);
  });

  return (
    <View className='test_fixed_page'>
      <View className='fixed' >
        fixed
      </View>
    </View>
  )
}