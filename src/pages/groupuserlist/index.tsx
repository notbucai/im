/*
 * @Author: bucai
 * @Date: 2020-07-15 22:27:49
 * @LastEditors: bucai
 * @LastEditTime: 2020-08-11 10:19:50
 * @Description: 
 */
import Taro, { useReady, useRouter, useReachBottom } from '@tarojs/taro';
import React, { useEffect, useState, useRef } from 'react';
import { View } from '@tarojs/components';

import UserItem from '../../components/user-item';

import './index.scss';
import { tim } from '../../global';
import { TimEvent } from '../../tim';


export default () => {
  const { params } = useRouter();
  const { id } = params;

  const [userlist, setUserlist] = useState<GroupMember[]>([]);
  const isLoadComplete = useRef(false)

  const loadData = async ({ groupID, count = 15, offset = 0 }) => {
    const imRes: TimEvent<{ memberList: GroupMember[] }> = await tim.getGroupMemberList({
      groupID,
      count,
      offset
    });
    return imRes.data?.memberList || [];
  }

  useReachBottom(async () => {
    if (isLoadComplete.current) return;
    const memberList = await loadData({ groupID: id, offset: userlist.length });
    if (!memberList || !memberList.length) {
      isLoadComplete.current = true;
      return;
    }
    const _userlist = [...userlist, ...memberList];
    setUserlist(_userlist);
  });

  useReady(async () => {
    const memberList = await loadData({ groupID: id });
    setUserlist(memberList);
  });

  const goChat = (item: GroupMember) => {
    Taro.navigateTo({
      url: '/pages/chat/index?id=C2C' + item.userID + '&name=' + (item.nick || item.userID) + '&type=C2C'
    });
  }

  return (
    <View className='grouplist'>
      <View>
        {
          userlist?.map(item => (
            <UserItem key={item.userID} role={item.role} name={item.nick || item.userID} onClick={() => { goChat(item) }} />
          ))
        }
      </View>

    </View>
  );
};
