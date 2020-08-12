/*
 * @Author: bucai
 * @Date: 2020-07-15 22:27:49
 * @LastEditors: bucai
 * @LastEditTime: 2020-08-11 17:32:46
 * @Description: 
 */
import Taro, { useReady } from '@tarojs/taro';
import React, { useEffect, useState, useCallback } from 'react';
import { View } from '@tarojs/components';

import CellItem from '../../components/cell';
import UserItem, { UserInfoTypeProps } from '../../components/user-item';
import { userlist1 as userlistApi } from '../../apis';
import useRequest from '../../hooks/useRequest';

import './index.scss';
import { tim } from '../../global';
import { PageInit } from '../../common/page';

type UserGroupType = {
  id: string,
  name: string,
  list: UserInfoTypeProps[]
}

const LinkMan = () => {

  const { data, run, error, loading } = useRequest<UserGroupType[]>(userlistApi);
  const [userlist, setUserlist] = useState<UserGroupType[]>([]);


  useReady(() => {
    run();
  });


  const getUsersInfo = useCallback(async () => {
    if (!data) return;
    const res = await tim.getUserProfile({ userIDList: data });
    console.log('res', res);

    const ProfileData: any[] = res.data;
    const userGroup: UserGroupType = {
      name: "所有用户",
      id: "all",
      list: []
    }
    userGroup.list = ProfileData.map((item) => {
      const profile: UserInfoTypeProps = {
        id: item.userID,
        avatar: item.avatar,
        name: item.nick || item.userID,
      }
      return profile;
    });
    setUserlist([userGroup]);
  }, [data]);

  useEffect(() => {
    if (data) {
      getUsersInfo();
    }
    return () => {

    };
  }, [data, getUsersInfo]);


  const goUserInfo = (user: UserInfoTypeProps) => {
    const uid = user.id;
    Taro.navigateTo({
      url: '/pages/user/index?id=' + uid
    });
  }

  const goPath = (path: string) => {
    Taro.navigateTo({
      url: path
    });
  }

  return (
    <View className='linkman'>

      <View className='action-list'>
        <CellItem title='发起会话' onClick={() => goPath('/pages/a-session/index')} />
        <CellItem title='加入群聊' onClick={() => goPath('/pages/join-group/index')} />
        <CellItem title='新建群聊' onClick={() => goPath('/pages/create-group/index')} />
        {/* <CellItem title='我的黑名单' onClick={() => goPath('/pages/blacklist/index')} /> */}
        <CellItem title='我的群组' onClick={() => goPath('/pages/grouplist/index')} />
      </View>

      <View>
        {
          userlist?.map(item => (
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

export default LinkMan;