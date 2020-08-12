/*
 * @Author: bucai
 * @Date: 2020-07-15 22:27:49
 * @LastEditors: bucai
 * @LastEditTime: 2020-08-11 13:11:04
 * @Description: 
 */
import Taro, { useRouter } from '@tarojs/taro';
import React, { useEffect, useState } from 'react';
import { View, Input, Picker } from '@tarojs/components';
import classNames from 'classnames';

import CellItem from '../../components/cell';

import './index.scss';

import { tim } from '../../global';
import { TYPES } from '../../tim';


export default () => {

  const { params } = useRouter()

  const [userID, setUserId] = useState('');

  const handleSunmit = async () => {
    const { id } = params;
    const imResponse = await tim.addGroupMember({
      groupID: id,
      userIDList: [userID],
    });
    const data = imResponse.data;
    console.log(data.successUserIDList); // 添加成功的群成员 userIDList
    console.log(data.failureUserIDList); // 添加失败的群成员 userIDList
    console.log(data.existedUserIDList); // 已在群中的群成员 userIDList
    console.log(data.group); // 添加后的群组信息

    Taro.showToast({
      icon: 'none',
      title: "成功",
    });
    Taro.navigateBack();
  }

  return (
    <View className='create-group'>

      <View className='create-info'>
        <CellItem title='用户ID' hasArrow={false}
          extraText={
            <Input placeholder='请输入用户ID' value={userID} onInput={e => setUserId(e.detail.value)} />
          }
        />
      </View>

      <View className='footer'>
        <View
          className={classNames('footer-btn', {
            'active': userID && userID.length
          })}
          hoverClass='btn-hover'
          onClick={handleSunmit}
        >邀请加入</View>
      </View>

    </View>
  );
};
