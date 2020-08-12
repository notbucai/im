import React, { ReactNode } from 'react';
import { View, Image } from '@tarojs/components';
import classNames from 'classnames';

import './index.scss';

export interface CellItemProps {
  id?: any,
  title?: string,
  note?: string | Element | undefined,
  thumb?: string,
  arrow?: 'right' | 'top' | 'bottom',
  extraText?: string | ReactNode | undefined,
  isSwitch?: boolean,
  switchColor?: string,
  hasBorder?: boolean,
  hasArrow?: boolean,
  onClick?: () => void,
  children?: any,
}

export default (props: CellItemProps = { hasArrow: true }) => {

  const hasArrow = typeof props.hasArrow === 'undefined' ? true : props.hasArrow;
  return (
    <View className={classNames('cell-item')} hoverClass='cell-hover' onClick={props.onClick}>

      {
        props.thumb && <View className='cell-item-avatar'>
          <Image src={props.thumb} className='cell-item-avatar-image' />
        </View>
      }

      <View className='cell-item-main'>

        <View className='cell-item-name'>{props.title}</View>
        <View className='cell-item-note'>{props.note}</View>

      </View>

      <View className='cell-item-right'>

        <View className='cell-item-extraText'>{props.extraText}</View>

        {hasArrow && <View className={classNames('cell-item-arrow', 'arrow_' + props.arrow)}></View>}

      </View>

    </View>
  );
}
