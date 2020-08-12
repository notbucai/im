import React, { useEffect } from 'react';
import { View, Text } from '@tarojs/components';
import classNames from 'classnames';
import useCountDown from '../../../../hooks/useCountDown';
import './index.scss';

interface Props {
  className?: string
  initCount?: number
  onFinish?: () => void
  onClick?: () => void
}

export default ({ className, initCount = 5, onFinish, onClick }: Props) => {

  const { count, clearCount } = useCountDown(initCount);

  useEffect(() => {
    if (count <= 0) {
      clearCount();
      onFinish && onFinish();
    };
  }, [count, onFinish, clearCount]);

  const _onClick = () => {
    clearCount();
    onClick && onClick();
  }

  return (
    <View className={classNames('countdown_box', className)} onClick={_onClick}>
      <Text>{count}</Text>
    </View>
  );
};
