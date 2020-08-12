import React from 'react';

import { View, Input, BaseEventOrig } from '@tarojs/components';

import Taro, { useRouter, useReady, usePullDownRefresh } from '@tarojs/taro';

import './index.scss';

export default () => {

  return (
    <View>
      <View className='fixed_btn' onClick={()=>Taro.navigateTo({url:'/pages/test/index'})}>
        GO
      </View>
    </View>
  )
}