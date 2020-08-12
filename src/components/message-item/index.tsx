import React from 'react';
import { View, Image, ITouchEvent } from '@tarojs/components';
import LogoImage from '../../assets/images/logo.png';
import './index.scss';

export interface MessageItemProps {
  id?: any,
  avatar?: string,
  name?: string,
  time?: Date | number | string,
  message?: string,
  count?: number,
  onClick?: (event: ITouchEvent) => void
}

export default (props: MessageItemProps) => {

  return (
    <View className='message_item' onClick={props.onClick}>

      <View className='message-avatar'>
        <Image src={props.avatar || LogoImage} mode='scaleToFill' className='message-avatar-image' />
      </View>
      
      <View className='message-content'>
        <View className='content-item'>
          <View className='content-item-name'>{props.name || ''}</View>
          {props.time && <View className='content-item-time'>{props.time || ''}</View>}
        </View>
        <View className='content-item'>
          <View className='content-item-message'>{props.message || ''}</View>
          {props.count ? <View className='content-item-count' >{props.count}</View> : null}
        </View>
      </View>

    </View>
  );
}
