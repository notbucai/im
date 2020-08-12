/*
 * @Author: bucai
 * @Date: 2020-07-15 22:27:49
 * @LastEditors: bucai
 * @LastEditTime: 2020-07-19 21:30:44
 * @Description: 
 */
import Taro from '@tarojs/taro';
import React, { useEffect } from 'react';
import { View } from '@tarojs/components';

import CellItem from '../../components/cell';
import UserItem, { UserInfoTypeProps } from '../../components/user-item';
import { userList } from '../../apis';
import useRequest from '../../hooks/useRequest';

import './index.scss';

type UserGroupType = {
  id: string,
  name: string,
  list: UserInfoTypeProps[]
}

export default () => {

  const { data, run, error, loading } = useRequest<UserGroupType[]>(userList);

  useEffect(() => {
    run();
    return () => { };
  }, [run]);


  const goUserInfo = (user: UserInfoTypeProps) => {
    const uid = user.id;
    Taro.navigateTo({
      url: '/pages/user/index?id=' + uid
    });
  }

  return (
    <View className='blacklist'>
      
      <View>
        {
          data?.map(item => (
            <View key={item.id} className='user-group'>
              <View className='user-group-title'>{item.name}</View>
              {
                item.list.map(user => (
                  <UserItem {...user} key={user.id} onClick={() => { goUserInfo(user) }} />
                ))
              }
            </View>
          ))
        }
      </View>

    </View>
  );
};
