import React from 'react';

import { View, Input, BaseEventOrig } from '@tarojs/components';

import Taro, { useRouter, useReady, usePullDownRefresh } from '@tarojs/taro';

import './index.scss';

export default () => {

  usePullDownRefresh(() => {
    console.log('我根本不会执行');
    setTimeout(() => {
      Taro.stopPullDownRefresh();
    }, 1000);
  });

  return (
    <View className='test_fixed_page'>
      <View className='fixed' >
        <Input className='f-input' value='click me' />
      </View>
    </View>
  )
}