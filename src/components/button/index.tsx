import React, { useCallback } from 'react';
import Taro from '@tarojs/taro';
import { View, ITouchEvent } from '@tarojs/components';
import classNames from 'classnames';
import './index.scss';

interface Porps {
  type?: 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger';
  plain?: boolean;
  disabled?: boolean;
  className?: string,
  children?: any;
  borderWidth?: number,
  onClick?: (event: ITouchEvent) => any
}

export default ({ type = 'default', plain = false, children, disabled = false, onClick, className, borderWidth = 1 }: Porps) => {

  const classList = classNames('bc-button', 'bc-button-' + type, disabled ? 'disabled' : '', plain ? 'plain' : '', className);

  const _onClick = useCallback((e: ITouchEvent) => {
    if (!disabled) {
      onClick && onClick(e);
    }
  }, [onClick, disabled]);

  return (
    <View onClick={_onClick} className={classList} style={{ borderWidth: Taro.pxTransform(borderWidth, 320) }}>
      {children}
    </View>
  );

}
