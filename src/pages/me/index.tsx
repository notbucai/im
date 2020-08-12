import Taro from '@tarojs/taro';
import React, { useEffect, useState } from 'react';
import { View, Image } from '@tarojs/components';
import { useSelector } from 'react-redux';

import './index.scss';

import CellItem from '../../components/cell';
import { tim } from '../../global';
import { PageInit } from '../../common/page';

const Me = () => {

  const { userinfo } = useSelector<{ user: { userinfo: UserInfo } }, { userinfo: UserInfo }>(state => state.user);

  // 获取用户列表

  const goUpdateUserInfoPage = () => {
    Taro.navigateTo({
      url: '/pages/userinfo/index',
    })
  }

  const goLogin = () => {
    tim.logout();
    Taro.redirectTo({
      url: '/pages/login/index',
    });
  }

  return (
    <View className='me-box'>


      <View className='user-base-box'>
        <View className='user-avatar'>
          {
            userinfo?.avatar && <Image className='user-avatar-image' src={userinfo?.avatar} />
          }
        </View>
        <View className='user-info'>
          <View className='user-name'>{userinfo?.name}</View>
          <View className='user-id'>用户ID:{userinfo?.id}</View>
        </View>
      </View>

      <View className='cell-group'>
        <CellItem title='个性签名' extraText={userinfo?.info || '暂无'} hasArrow={false} />
      </View>

      <View className='cell-group'>
        <CellItem title='修改资料' onClick={() => { goUpdateUserInfoPage() }} />
      </View>

      <View className='cell-group'>
        <CellItem title='退出登录' onClick={() => { goLogin() }} />
      </View>

    </View>
  );
};



export default Me;