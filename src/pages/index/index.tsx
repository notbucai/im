import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import logoImg from '../../assets/images/logo.png';
import CountDown from './components/count-down';
import './index.scss';

export default () => {

  const goToHome = () => {
    Taro.redirectTo({ url: '/pages/login/index' })
  }

  return (
    <View className='bc-index'>
      <View className='banner-box'>
        <Image src='https://image.notbucai.com/2020/07/13/7398b07a94cc14b43b9f2de00a105fdb.png' className='banner-iamge' mode='aspectFill'></Image>
      </View>
      <View className='copy-box'>
        <View>
          <Image src={logoImg} className='copy-logo-iamge'></Image>
        </View>
        <View>
          <Text className='copy-info'>IPv6支持</Text>
        </View>
        <CountDown className='count-down_box' onFinish={() => { goToHome() }} onClick={() => { goToHome() }} />
      </View>
    </View>
  );
}