/*
 * @Author: bucai
 * @Date: 2020-07-15 22:27:49
 * @LastEditors: bucai
 * @LastEditTime: 2020-08-11 10:52:56
 * @Description: 
 */
import React, { useState } from 'react';
import Taro, { useReady, useRouter } from '@tarojs/taro';
import { View, Image, Text, Switch, Input, BaseEventOrig } from '@tarojs/components';
import { InputProps } from '@tarojs/components/types/Input';
import CellItem from '../../components/cell';

import './index.scss';
import { tim } from '../../global';
import { TimEvent } from '../../tim';

import addicon from '../../assets/images/addicon.png';
import moreicon from '../../assets/images/moreicon.png';

export default () => {
  const { params } = useRouter();
  const goUserInfo = (item: GroupMember) => {
    Taro.navigateTo({
      url: '/pages/user/index?id=' + item.userID
    });
  }
  const goGroupUserList = () => {
    const { id } = params;
    Taro.navigateTo({
      url: '/pages/groupuserlist/index?id=' + id
    });
  }
  const goInvitationGroup = () => {
    const { id } = params;
    Taro.navigateTo({
      url: '/pages/invitation-group/index?id=' + id
    });
  }
  const onConfirmName = async (name: string) => {
    const { id } = params;

    // e.detail.value
    await tim.setGroupMemberNameCard({
      groupID: id,
      nameCard: name
    });
    Taro.showToast({ title: name + "成功", icon: "none" });

  }


  const [state, setState] = useState<GroupProfile>();
  const [userlist, setUserlist] = useState<GroupMember[]>([]);

  useReady(async () => {
    const { id } = params;
    const promises: Promise<TimEvent<any>>[] = [];
    const p1 = tim.getGroupProfile({
      groupID: id
    });
    const p2 = tim.getGroupMemberList({
      groupID: id
    });
    promises.push(p1);
    promises.push(p2);

    const [imRes1, imRes2] = await Promise.all(promises)
    console.log('imRes1, imRes2', imRes1, imRes2);

    // const imRes: TimEvent<GroupProfile> = 
    const resData1: GroupProfile = imRes1.data.group;
    const resData2: GroupMember[] = imRes2.data.memberList;
    setState(resData1);
    setUserlist(resData2);
  });

  return (
    <View className='chatinfo-box'>
      <View className='chatinfo-header'>

        {
          userlist.map((item, index) => {
            return (
              <View className='user-item' key={index} onClick={() => goUserInfo(item)}>
                <Image
                  src={item?.avatar || ''}
                  className='user-avatar'
                />
                <Text className='user-name'>{item.nick || item.userID}</Text>
              </View>
            )
          })
        }
        <View className='user-item' onClick={() => { goGroupUserList() }}>
          <Image
            src={moreicon}
            className='user-avatar'
          />
          <Text className='user-name'>查看全部</Text>
        </View>
        <View className='user-item' onClick={() => { goInvitationGroup() }}>
          <Image
            src={addicon}
            className='user-avatar'
          />
          <Text className='user-name'>添加</Text>
        </View>

      </View>
      <View className='chatinfo-actions'>
        <CellItem title='群ID' extraText={state?.groupID} hasArrow={false} />
        <CellItem title='群名称' extraText={state?.name} hasArrow={false} />
        <CellItem title='我在本群的昵称'
          extraText={<Input className='user-name-input' value={state?.selfInfo.nameCard} placeholder='点击修改昵称' onConfirm={e => onConfirmName(e.detail.value)} />}
        />
        <CellItem title='全群禁言'
          extraText={
            <Switch checked={state?.muteAllMembers}></Switch>
          }
          hasArrow={false}
        />
        <CellItem title='退出群聊' />
      </View>
    </View>
  );
};
