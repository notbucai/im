/*
 * @Author: bucai
 * @Date: 2020-07-15 22:27:49
 * @LastEditors: bucai
 * @LastEditTime: 2020-08-12 15:37:33
 * @Description: 
 */
import React from 'react';
import Taro from '@tarojs/taro';
import { View, Image, Input } from '@tarojs/components';
import { useSelector } from 'react-redux';

import './index.scss';

import CellItem from '../../components/cell';
import { tim } from '../../global';
import { PageInit } from '../../common/page';

const UserInfoPage = () => {
  const { userinfo } = useSelector<{ user: { userinfo: UserInfo } }, { userinfo: UserInfo }>(state => state.user);

  const updateUserInfo = async (type: string, value: string) => {
    const key = {
      'name': 'nick',
      'avatar': 'avatar',
      'info': 'selfSignature',
    }[type];
    await tim.updateMyProfile({
      [key]: value
    });
    Taro.showToast({ title: '成功', icon: 'success' });
  }

  return (
    <View className='user-box'>
      <CellItem title='UserId' hasArrow={false} extraText={userinfo.id} />
      <CellItem title='头像'
        hasArrow={false}
        extraText={
          <Image
            style={{ width: "30px", height: "30px" }}
            src={userinfo.avatar}
          />
        }
      />
      <CellItem
        title='昵称'
        extraText={
          <Input value={userinfo.name} onConfirm={(event) => updateUserInfo('name', event.detail.value)} />
        }
      />
      <CellItem title='个性签名'
        extraText={
          <Input value={userinfo.info} onConfirm={(event) => updateUserInfo('info', event.detail.value)} />
        }
      />
    </View>
  );
};



export default UserInfoPage;