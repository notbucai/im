import React, { useEffect } from 'react';
import { Text, View } from "@tarojs/components";
import classNames from 'classnames';
import './index.scss';

type Porps = {
  isOpened: boolean,
  hasMask?: boolean,
  customStyle?: object,
  text?: string,
  status?: 'success' | 'error' | 'warn' | 'info',
  className?: string,
  timeout?: number,
  onClose: () => void;
}
export const statusMap = {
  'success': {
    color: '#13ce66',
    icon: 'check'
  },
  'error': {
    color: '#ff4949',
    icon: 'close'
  },
  'warn': {
    color: '#ffc82c',
    icon: 'alert-circle'
  },
  'info': {
    color: '#78a4fa',
    icon: 'alert-circle'
  },
}

export default ({ isOpened, hasMask = false, customStyle = {}, text = '', status = 'info', timeout = 2500, className, onClose }: Porps) => {

  const bodyClass = classNames('toast-body');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpened) {
      timer = setTimeout(() => {
        onClose && onClose();
      }, timeout);
    }
    return () => {
      clearTimeout(timer);
    }
  }, [isOpened, onClose, timeout]);

  const _status = statusMap[status];

  return isOpened ? (
    <View className={classNames('bc-toast', className)}>
      {hasMask && <View className='bc-toast__overlay' />}
      <View
        className={bodyClass}
        style={customStyle}
      >
        <View className='toast-body-content'>
          {
            status &&
            <View className='toast-body-content__icon' style={{ backgroundColor: _status['color'] }}>
              {/* <AtIcon value={_status['icon']} size={1000} color='#fff'></AtIcon> */}
              <View className={classNames('at-icon', 'at-icon-' + _status.icon)}></View>
            </View>
          }
          {text && (
            <View className='toast-body-content__info'>
              <Text>{text}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  ) : null;
}