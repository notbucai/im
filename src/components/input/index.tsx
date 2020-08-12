import React, { useRef, useState } from 'react';
import { View, Input } from '@tarojs/components';
import { InputProps } from '@tarojs/components/types/Input';
import classNames from 'classnames';
import './index.scss';

interface Props extends InputProps {
  children?: any
}

export default (props: Props) => {

  const [passStatus, setPassStatus] = useState(props.password);

  const changePassIcon = () => {
    setPassStatus(_passStatus => !_passStatus);
  }

  return (
    <View className={classNames('bc-input', props.className)} >
      <Input {...props} password={passStatus} className='bc-input_input' />
      {
        props.password && (
          <View className={classNames('iconfont', passStatus ? 'icon-eye' : 'icon-eye1')} onClick={() => { changePassIcon() }}></View>
        )
      }
    </View>
  );
};
