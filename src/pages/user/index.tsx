/*
 * @Author: bucai
 * @Date: 2020-07-15 22:27:49
 * @LastEditors: bucai
 * @LastEditTime: 2020-08-12 15:26:38
 * @Description: 
 */
import React, { useEffect, useState } from 'react';
import Taro, { useReady, useRouter } from '@tarojs/taro';
import { View, Image, Switch, BaseEventOrig } from '@tarojs/components';
import BcToast from '../../components/toast';

import './index.scss';
import { tim } from '../../global';
import { PageInit } from '../../common/page';

export type UserInfoType = {
  id: string | number,
  name: string,
  info: string,
  status: boolean,
  avatar: string,
  time: string,
  friend: boolean,
};

const UserPage = () => {

  // const { run, data, error, loading } = useRequest(changeUserStatus);
  // const { run: uRun, data: uData, error: uError, loading: uLoading } = useRequest<UserInfoType>(_userinfo);
  const [isOpen, setIsOpen] = useState(false);
  const [userinfo, setuserinfo] = useState<UserInfoType>();
  const router = useRouter();

  useReady(async () => {
    const { id } = router.params
    const res = await tim.getUserProfile({ userIDList: [id] });

    const profile: Profile = res?.data[0];


    setuserinfo({
      id: profile.userID,
      name: profile.nick || profile.userID,
      info: profile.selfSignature,
      status: false,
      avatar: profile.avatar,
      time: new Date(profile.lastUpdatedTime * 1000).toLocaleString(),
      friend: true,
    })


  });


  // useEffect(() => {
  //   uRun();
  // }, [uRun]);

  // useEffect(() => {
  //   if (uData) {
  //     setuserinfo(uData);
  //   }
  // }, [uData]);

  // useEffect(() => {
  //   if (!loading && data && !error) {
  //     // uData
  //     setIsOpen(true);
  //   } else {
  //     setIsOpen(false);
  //   }
  //   return () => { };
  // }, [error, data, loading]);

  // const handleChangeUserStatus = (status: boolean) => {
  //   run(status);
  //   setuserinfo(_uData => {
  //     if (_uData) {
  //       _uData.status = status;
  //     }
  //     return _uData;
  //   });
  // }

  const goChat = () => {
    Taro.navigateTo({
      url: '/pages/chat/index?id=' + 'C2C' + userinfo?.id + '&name=' + userinfo?.name + '&type=C2C'
    });
  }
  // const onChange = (event: BaseEventOrig<SwitchProps.onChangeEventDetail>) => {
  //   const status = event.detail.value;
  //   handleChangeUserStatus(status);
  // }
  return (
    <View className='user-box'>

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

      <View className='item-box'>
        <View className='item-left'>个性签名</View>
        <View className='item-right'>{userinfo?.info}</View>
      </View>

      {/* <View className='item-box'>
        <View className='item-left'>加入黑名单</View>
        <View className='item-right'>
          <Switch onChange={onChange} checked={uData?.status} color='#ff0000' />
        </View>
      </View> */}
      {
        userinfo && <View className='footer'>
          <View className='footer-action'>
            {/* {
              !uData?.friend && <View className='action-item'>加为好友</View>
            } */}
            <View className='action-item _main' onClick={goChat}>
              发送消息
          </View>
          </View>
        </View>
      }
      <BcToast status='success' text='成功' isOpened={isOpen} onClose={() => { setIsOpen(false) }} />
    </View>
  );
};




export default UserPage;