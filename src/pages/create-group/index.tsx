/*
 * @Author: bucai
 * @Date: 2020-07-15 22:27:49
 * @LastEditors: bucai
 * @LastEditTime: 2020-08-12 15:36:59
 * @Description: 
 */
import Taro from '@tarojs/taro';
import React, { useEffect, useState } from 'react';
import { View, Input, Picker } from '@tarojs/components';
import classNames from 'classnames';

import CellItem from '../../components/cell';

import './index.scss';

import { TYPES, TimEvent } from '../../tim';
import { tim } from '../../global';
import { PageInit } from '../../common/page';

const GroupTypeMap = {
  [TYPES.GRP_WORK]: '好友工作群',
  [TYPES.GRP_PUBLIC]: '陌生人社交群',
  [TYPES.GRP_MEETING]: '临时会议群',
  [TYPES.GRP_AVCHATROOM]: '直播群',
};

const GroupTypeKeyArray = Object.keys(GroupTypeMap);
const GroupTypeValueArray = Object.values(GroupTypeMap);


const GreateGroup =  () => {

  const [type, setType] = useState(0);
  const [name, setName] = useState('');

  const handleSunmit = async () => {
    const option: CreateGroupOption = { name, type: GroupTypeKeyArray[type] };
    await tim.createGroup(option);
    Taro.showToast({
      title: '成功',
      icon: 'success'
    });
    setName('');
    setType(0);
  }

  return (
    <View className='create-group navbar-top'>

      <View className='create-info'>
        <CellItem title='群名称' hasArrow={false}
          extraText={
            <Input placeholder='请输入群名称' value={name} onInput={e => setName(e.detail.value)} />
          }
        />
        <CellItem title='群类型'
          extraText={
            <Picker value={0} mode='selector' range={GroupTypeValueArray} onChange={e => setType(parseInt(e.detail.value.toString()))}>
              <View className='picker'>
                {GroupTypeValueArray[type]}
              </View>
            </Picker>
          }
        />
      </View>

      <View className='footer'>
        <View
          className={classNames('footer-btn', {
            'active': name && name.length
          })}
          hoverClass='btn-hover'
          onClick={handleSunmit}
        >立刻创建</View>
      </View>

    </View>
  );
};



export default GreateGroup;