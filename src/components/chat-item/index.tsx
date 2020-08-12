import React from 'react';
import { View, Image } from '@tarojs/components';
import classNames from 'classnames';

import './index.scss';

export interface ChatItemProps {
  id?: any,
  isMe?: boolean,
  avatar: string,
  name: string,
  content: string,
  userID?: string|number,
  onClick?: () => void,
  onClickAvatar?: () => void,
  onClickContent?: () => void
}

export default (props: ChatItemProps) => {
  return (
    <View className={classNames('chat-item', props.isMe && '_right')} onClick={props.onClick}>

      <View className='chat-item-avatar' onClick={props.onClickAvatar}>
        <Image src={props.avatar} className='chat-item-avatar-image' />
      </View>

      <View className='chat-item-main'>

        <View className='chat-item-name'>{props.name}</View>
        <View className='chat-item-content' onClick={props.onClickContent}>{props.content}</View>

      </View>
    </View>
  );
}
