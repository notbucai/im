/*
 * @Author: bucai
 * @Date: 2020-07-15 22:27:49
 * @LastEditors: bucai
 * @LastEditTime: 2020-08-12 15:21:34
 * @Description: 
 */
import Taro, { useReady } from '@tarojs/taro';
import React, { useEffect, useState } from 'react';
import { View } from '@tarojs/components';

import UserItem from '../../components/user-item';

import './index.scss';
import { tim } from '../../global';
import { TimEvent } from '../../tim';
import { PageInit } from '../../common/page';


const GroupList = () => {

  const [grouplist, setGrouplist] = useState<GroupProfile[]>([]);


  useReady(async () => {
    const imRes: TimEvent<{ groupList: GroupProfile[] }> = await tim.getGroupList();

    setGrouplist(imRes.data?.groupList || []);
  });

  const goChat = (item: GroupProfile) => {
    Taro.navigateTo({
      url: '/pages/chat/index?id=GROUP' + item.groupID + '&name=' + (item.name || item.groupID) + '&type=GROUP'
    });
  }

  return (
    <View className='grouplist'>

      <View>
        {
          grouplist?.map(item => (
            <UserItem key={item.groupID} name={item.name || item.groupID} onClick={() => { goChat(item) }} />
          ))
        }
      </View>

    </View>
  );
};

export default GroupList;