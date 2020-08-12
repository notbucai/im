import React from 'react';
import { View, Text } from '@tarojs/components';

import './index.scss';

export type MessageTipProps = {
  content: string
};

const index = ({ content }: MessageTipProps) => {
  return (
    <View className='message-tip'>
      <Text className='message-tip-text'>{content}</Text>
    </View>
  );
}

export default index;
