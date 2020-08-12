import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro';
import { View, Image, Navigator } from '@tarojs/components'

import { tim } from '../../global';

import BcInput from '../../components/input';
import BcButton from '../../components/button';

import useSystemInfo from '../../hooks/useSystemInfo';

import logoImg from '../../assets/images/logo.png';

import './index.scss';
import { login } from '../../apis';
import useRequest from '../../hooks/useRequest';
import { EVENT, TimEvent } from '../../tim';
import { PageInit } from '../../common/page';

const Login = ({ showToast }: PageProps) => {

  const systemInfo = useSystemInfo();

  const [user, setUser] = useState({
    username: '',
    password: ''
  });

  const { run: uRun, data: uData, error: uError, loading: uLoading } = useRequest<string>(login);
  useEffect(() => {
    tim.on(EVENT.SDK_READY, function (event: TimEvent<any>) {
      // 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
      // event.name - TIM.EVENT.SDK_READY
      console.log('SDK_READY', event);

      Taro.hideLoading();

      // setIsShowToast(true);
      // setStatus('success');
      // setMsg('登录成功');


      Taro.switchTab({ url: '/pages/home/index' });
    });
    return () => {

    };
  }, []);

  useEffect(() => {
    if (uLoading) {
      Taro.showLoading({
        mask: true,
        title: "登录中"
      });
    } else {
    }
    return () => {
      Taro.hideLoading();
    };
  }, [uLoading]);


  useEffect(() => {
    if (uError) {
      showToast({
        type: 'error',
        title: uError.message,
      });
    }
    return () => {
    }
  }, [uError, showToast]);

  useEffect(() => {

    if (typeof uData == 'string') {
      (async () => {
        const { username, password } = user;
        Taro.setStorageSync('user', {
          username,
          password,
          userSig: uData
        });

        const loginData = await tim.login({ userID: username, userSig: uData });
        // 登录成功

        showToast({
          type: 'success',
          title: '登录成功',
        });
        console.log('登录成功!', loginData.data); // 登录成功
        if (loginData.data.repeatLogin === true) {
          // 标识账号已登录，本次登录操作为重复登录。v2.5.1 起支持
          console.log(loginData.data.errorInfo);
        }
      })()
    }
    return () => {

    };
  }, [uData, user, showToast]);


  const doLogin = async () => {
    const { username, password } = user;
    if (!username || !password) {
      // setMsg('用户名密码不能为空');

      showToast({
        type: 'error',
        title: '用户名密码不能为空',
      });
    }
    await uRun(user);

  }

  const onInput = (key: string, value: string) => {
    setUser(_user => {
      return {
        ..._user,
        [key]: value
      }
    })
  }

  return (
    <View className='login-box' style={{ paddingTop: (systemInfo?.statusBarHeight ?? 0) + 'px' }}>

      <View className='login-header'>

        <View className='login-title'>
          <Image src={logoImg} className='logo-iamge'></Image>
        </View>

      </View>

      <View className='login-form'>
        <View className='form-item'>
          <BcInput placeholder='username' autoFocus value={user.username} onInput={e => { onInput('username', e.detail.value) }} />
        </View>
        <View className='form-item'>
          <BcInput placeholder='password' password onInput={e => { onInput('password', e.detail.value) }} />
        </View>
        <View className='form-item'>
          <BcButton type='primary' onClick={() => { doLogin() }}>Go</BcButton>
        </View>
        {/* <View className='form-item'>
          <View>or</View>
        </View>
        <View className='form-item'>
          <Navigator url='/pages/register/index' openType='redirect'>sign up</Navigator>
        </View> */}
      </View>

      <View className='login-footer'>
        <View className='form-button'>forget password</View>
      </View>
    </View>
  );
}

export default PageInit()(Login);