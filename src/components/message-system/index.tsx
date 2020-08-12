import React, { useState } from 'react';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.scss'
import { tim } from '../../global';

export type MessageSystemProps = {
  date: string,
  content: string,
  message: Message<GroupSystemNoticePayload>
};

export default ({ date, content, message }: MessageSystemProps) => {
  console.log('message', message);

  const [isAction, setIsAction] = useState(true);

  const handleSubmit = async (status: boolean) => {

    const handleAction = status ? 'Agree' : 'Reject';

    await tim.handleGroupApplication({
      handleAction,
      handleMessage: '',
      message: message
    });

    setIsAction(false);

    Taro.showToast({
      icon: 'none',
      title: '处理完成'
    })


  }

  return (
    <View className='message-system'>
      <View>{date}</View>
      <View>{content}</View>
      {
        (message.payload.operationType === 1 && isAction) ? (
          <View className='actions'>
            <View className='btn confirm' onClick={() => handleSubmit(true)}>通过</View>
            <View className='btn' onClick={() => handleSubmit(false)}>拒绝</View>
          </View>
        ) : null
      }
    </View>
  );
}


