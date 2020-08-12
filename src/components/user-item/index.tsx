import React from 'react';
import classNames from 'classnames';
import { View, Image, ITouchEvent } from '@tarojs/components';
import LogoImage from '../../assets/images/logo.png';
import './index.scss';
import { TYPES } from '../../tim';

export interface UserInfoTypeProps {
  id?: any,
  avatar?: string,
  name?: string,
  role?: string,
  onClick?: (event: ITouchEvent) => void
}


const RoleMap = {
  [TYPES.GRP_MBR_ROLE_OWNER]: {
    name: '群主',
    className: 'role1'
  },
  [TYPES.GRP_MBR_ROLE_ADMIN]: {
    name: '管理员',
    className: 'role2'
  },
  [TYPES.GRP_MBR_ROLE_MEMBER]: {
    name: '群成员',
    className: 'role3'
  },
  'default': {
    name: '群成员',
    className: 'role3'
  },
};

export default (props: UserInfoTypeProps) => {

  let role = RoleMap[props.role || 'default'];

  return (
    <View className='user_item' onClick={props.onClick}>

      <View className='user-avatar'>
        <Image src={props.avatar || LogoImage} mode='scaleToFill' className='user-avatar-image' />
      </View>
      <View className='user-content'>
        <View className='content-item'>
          {props.role ? <View className={classNames('content-item-role', role.className)}>{role.name}</View> : null}
          <View className='content-item-name'>{props.name || ''}</View>
        </View>
      </View>

    </View>
  );
}
