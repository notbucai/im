/*
 * @Author: bucai
 * @Date: 2020-07-15 22:27:49
 * @LastEditors: bucai
 * @LastEditTime: 2020-08-12 15:08:15
 * @Description: 
 */
import Taro, { useRouter } from '@tarojs/taro';
import React, { useState } from 'react';
import { View, Input } from '@tarojs/components';
import classNames from 'classnames';

import CellItem from '../../components/cell';

import { tim } from '../../global';
import { PageInit } from '../../common/page';

import './index.scss';

const ASession = () => {

  const [userID, setUserId] = useState('');

  const handleSunmit = async () => {
    const data = await tim.getConversationProfile('C2C' + userID);
    Taro.redirectTo({
      url: '/pages/user/index?id=' + userID
    });
  }

  return (
    <View className='a-session navbar-top'>

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
        >发起会话</View>
      </View>

    </View>
  );
};

export default ASession;