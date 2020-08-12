/*
 * @Author: bucai
 * @Date: 2020-07-15 22:27:49
 * @LastEditors: bucai
 * @LastEditTime: 2020-08-12 15:37:10
 * @Description: 
 */
import Taro from '@tarojs/taro';
import React, { useEffect, useState } from 'react';
import { View, Input, Picker } from '@tarojs/components';
import classNames from 'classnames';

import CellItem from '../../components/cell';

import './index.scss';

import { tim } from '../../global';
import { TYPES } from '../../tim';
import { PageInit } from '../../common/page';


const JoinGroup = () => {

  const [applyMessage, setApplyMessage] = useState('');
  const [groupID, setGroupID] = useState('');

  const handleSunmit = async () => {

    const imRequest = await tim.joinGroup({
      groupID,
      applyMessage
    });
    const data = imRequest.data;

    if (data.status == TYPES.JOIN_STATUS_WAIT_APPROVAL) {
      return Taro.showToast({
        icon: 'success',
        title: "申请成功,等待管理员审核"
      })
    } else if (data.status == TYPES.JOIN_STATUS_SUCCESS) {
      Taro.showToast({
        icon: 'success',
        title: "加群成功"
      })
    } else if (data.status == TYPES.JOIN_STATUS_ALREADY_IN_GROUP) {
      Taro.showToast({
        icon: 'none',
        title: "已在群中"
      })
    }
  }

  return (
    <View className='create-group navbar-top'>

      <View className='create-info'>
        <CellItem title='群ID' hasArrow={false}
          extraText={
            <Input placeholder='请输入群ID' value={groupID} onInput={e => setGroupID(e.detail.value)} />
          }
        />
      </View>

      <View className='create-info'>
        <CellItem title='备注' hasArrow={false}
          extraText={
            <Input placeholder='请输入备注' value={applyMessage} onInput={e => setApplyMessage(e.detail.value)} />
          }
        />
      </View>

      <View className='footer'>
        <View
          className={classNames('footer-btn', {
            'active': groupID && groupID.length
          })}
          hoverClass='btn-hover'
          onClick={handleSunmit}
        >申请加入</View>
      </View>

    </View>
  );
};



export default JoinGroup;