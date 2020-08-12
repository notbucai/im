import React, { ComponentType, useState, Component } from 'react';
import { Block, View } from '@tarojs/components';
import { AtNavBar } from 'taro-ui'
import { AtNavBarProps } from 'taro-ui/types/nav-bar';
import Taro from '@tarojs/taro';

import BcToast from '../components/toast';

import './page.scss';

if(process.env.TARO_ENV == 'h5'){
  require('./h5.scss')
}

export const PageInit = (config?: PageOptopns<AtNavBarProps>) => {
  console.log('config', config);

  return (Wrapper: ComponentType<any>) => {

    return class extends Component<any, any, any> {
      constructor(props) {
        super(props);
        this.state = {
          show: false,
          type: 'success',
          title: '',
          mark: false,
          timeout: 1500
        };
      }

      showToast = (option: ShowToastOptionType) => {
        this.setState(() => ({
          show: true,
          type: option.type || 'success',
          mark: option.mark || false,
          timeout: option.timeout || 1500,
          title: option.title
        }))
      };

      hideToast = () => {
        this.setState({
          show: false
        });
      }

      render () {
        const props = this.props;
        const $props = {
          showToast: this.showToast
        };
        const state = this.state;
        return (
          <Block>
            {/* config */}
            {
              config?.navbar && process.env.TARO_ENV === 'h5'
                ?
                <View className='page-navbar'>
                  <AtNavBar
                    {...config.navbar}
                  />
                </View>
                :
                null
            }
            {/* 只要这样 hoc方式引入 那taro就会把它当作一个组件进行处理 导致 wrapper 中的useReady 无法正常触发 */}
            <Wrapper {...props} {...$props} />
            <BcToast
              isOpened={state.show}
              onClose={this.hideToast}
              text={state.title}
              status={state.type}
              hasMask={state.mark}
              timeout={state.timeout}
            />
          </Block>
        )
      }
    };

  }
}